import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const createLecture = () => {
  const isLoading = false;
  const navigate = useNavigate();

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
            // value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course title"
          />
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
            // onClick={createCourseHandler}
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

export default createLecture;
