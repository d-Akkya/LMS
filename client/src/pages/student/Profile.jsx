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
import Course from "./Course";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadUserQuery } from "@/features/api/authApi";

const Profile = () => {
  const { data, isLoading } = useLoadUserQuery();
  
  if (!data || !data.user) return <ProfileSkeleton />;
  const { user } = data;

  const profileIsLoading = isLoading;

  return profileIsLoading ? (
    <ProfileSkeleton />
  ) : (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 cursor-pointer">
            <AvatarImage
              src={user.photoUrl || "https://github.com/evilrabbit.png"}
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
                {user.name}
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-2">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-2">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.role.toUpperCase()}
              </span>
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2 ml-2 cursor-pointer">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
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
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <div>
              <h1 className="w-screen">
                You're not enrolled in any courses yet. Start exploring and
                enroll in a course to begin your learning journey!
              </h1>
              <Button
                className="mt-3 dark:bg-gray-800 hover:bg-gray-200 text-blue-600 cursor-pointer"
                variant="outline"
              >
                <Link to="/">Explore Courses</Link>
              </Button>
            </div>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      {/* Profile Header */}
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
        </div>

        {/* Profile Details */}
        <div>
          {/* Name */}
          <div className="mb-2">
            <div className="flex items-center gap-2 m-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          {/* Email */}
          <div className="mb-2">
            <div className="flex items-center gap-2 m-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>

          {/* Role */}
          <div className="mb-2">
            <div className="flex items-center gap-2 m-2">
              <Skeleton className="h-6 w-10" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          {/* Edit Profile Button */}
          <Skeleton className="h-9 w-24 mt-2 ml-2" />
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <Skeleton className="h-6 w-56 mb-5" />

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {/* Course Card Skeletons */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-32 w-full rounded" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
