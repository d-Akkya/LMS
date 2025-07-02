import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth || {});
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  // Show success message when user logs out
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School
            size={30}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1
            className="hidden md:block font-extrabold text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            SkillNova
          </h1>
        </div>
        {/* User icon and dark mode icon */}
        <div className="flex items-center gap-8">
          <DarkMode />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="rounded-md h-[34px] w-[34px] cursor-pointer">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/evilrabbit.png"}
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="continue-learning">Continue Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-[78px] cursor-pointer"
              >
                Signup
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-[78px] bg-black text-white cursor-pointer"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between h-full px-4">
        <h1 className="text-2xl font-extrabold">SkillNova</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "student"; // or "student"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-md bg-gray-200 hover:bg-gray200 "
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-4">
          <SheetTitle>SkillNova</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 ml-4">
          <span>Continue Learning</span>
          <span>Edit Profile</span>
          <span>Log out</span>
        </nav>
        {role === "instructor" ? (
          <SheetFooter className="m-0">
            <Button type="submit">Dashboard</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        ) : (
          <SheetFooter className="m-0">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
