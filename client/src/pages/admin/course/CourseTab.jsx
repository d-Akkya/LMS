import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const { data: courseByIdData, isLoading: courseByIdLoading } =
    useGetCourseByIdQuery(courseId);
  const course = courseByIdData?.course;
  useEffect(() => {
    if (course) {
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: Number(course.coursePrice),
        courseThumbnail: course.courseThumbnail,
      });
    }
  }, [course]);

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // get file and set preview thumbnail
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated.");
      navigate("/admin/course");
    }
    if (error) {
    }
  }, [isSuccess, error]);

  const isPublished = true;

  if (courseByIdLoading) return <CourseTabSkeleton />;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" className="cursor-pointer">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button className="cursor-pointer">Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4 mt-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={changeEventHandler}
                placeholder="eg. Intro to Programming"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="eg. A comprehensive introduction to programming"
              />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Category</Label>
                <Select onValueChange={selectCategory} value={input.category}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="CSS">CSS</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="React">React</SelectItem>
                      <SelectItem value="Nextjs">Nextjs</SelectItem>
                      <SelectItem value="Nodejs">Nodejs</SelectItem>
                      <SelectItem value="Expressjs">Expressjs</SelectItem>
                      <SelectItem value="MongoDB">MongoDB</SelectItem>
                      <SelectItem value="Frontend Development">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="Backend Development">
                        Backend Development
                      </SelectItem>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="Docker">Docker</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Course Level</Label>
                <Select
                  onValueChange={selectCourseLevel}
                  value={input.courseLevel}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Level</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price in (INR₹)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="99"
                  className="w-fit"
                />
              </div>
            </div>
            <div>
              <Label>Course Thumbnail</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={selectThumbnail}
                className={"w-fit"}
              />
              {(previewThumbnail || input.courseThumbnail) && (
                <img
                  src={previewThumbnail || input.courseThumbnail}
                  alt="Course Thumbnail"
                  className="w-64 my-2"
                />
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/course")}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={updateCourseHandler}
                className="cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

const CourseTabSkeleton = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Card Header */}
      <div className="flex flex-row justify-between p-6">
        <div>
          <div className="mb-2">
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="space-x-2">
          <Skeleton className="inline-block h-10 w-20" />
          <Skeleton className="inline-block h-10 w-28" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 pt-0">
        <div className="space-y-4 mt-5">
          {/* Title Field */}
          <div>
            <Skeleton className="h-4 w-8 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Subtitle Field */}
          <div>
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Description Field */}
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Category, Course Level, Price Row */}
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          {/* Course Thumbnail */}
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-10 w-32 mb-1" />
            <Skeleton className="w-64 h-36 my-2" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
