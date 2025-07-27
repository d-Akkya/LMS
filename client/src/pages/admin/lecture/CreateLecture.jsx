import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const createLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");

  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 select-none">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          You can add lecture details like title, description, and other
          information. After adding the lecture, you can manage it from the
          lectures section.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture title"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => navigate(-1)}
            disabled={isLoading}
            variant={"outline"}
            className={"cursor-pointer"}
          >
            Back to Course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className={"cursor-pointer"}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default createLecture;
