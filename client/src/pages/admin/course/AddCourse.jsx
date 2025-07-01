import { Button } from "@/components/ui/button";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // for displaying toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully.");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 select-none">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic details for your new course
        </h1>
        <p className="text-sm">
          You can add course details like title, description, and other
          information. After adding the course, you can manage it from the
          courses section.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course title"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Nextjs">Nextjs</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="AWS">AWS</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Nodejs">Nodejs</SelectItem>
                <SelectItem value="Expressjs">Expressjs</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Backend Development">
                  Backend Development
                </SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
                <SelectItem value="CSS">CSS</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => navigate(-1)}
            disabled={isLoading}
            variant={"outline"}
            className={"cursor-pointer"}
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className={"cursor-pointer"}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
