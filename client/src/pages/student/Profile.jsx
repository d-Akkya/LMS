import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React from "react";

const Profile = () => {
  const isLoading = true;

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 cursor-pointer">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-2">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                John Developer
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-2">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                johndeveloper@gmail.com
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-2">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Student
              </span>
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2 ml-2 cursor-pointer">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name-1">Name</Label>
                  <Input
                    type="text"
                    id="name-1"
                    name="name"
                    placeholder="John Developer"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="col-span-3 cursor-pointer"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className={"cursor-pointer"}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={isLoading}
                  className={"cursor-pointer"}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
