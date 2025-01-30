'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import Icons from 'src/components/Icons';

const RegisterForm = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="network_manager_user_id" className="font-normal ">
          ID del servicio contratado
        </Label>
        <Input
          id="network_manager_user_id"
          type="text"
          placeholder="5647"
          required
          className="h-12"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="font-normal ">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          className="h-12"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type_of_person" className="font-normal ">
          Type of person
        </Label>
        <Input
          id="type_of_person"
          type="type_of_person"
          placeholder="Jurídico"
          required
          className="h-12"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label
            htmlFor="password"
            className="font-normal flex w-full justify-between"
          >
            Your password
            <button
              className="flex items-center justify-center"
              onClick={() => {
                setPasswordVisible((prev) => !prev);
              }}
            >
              {isPasswordVisible ? (
                <EyeIcon className="w-4 h-4 mr-1" />
              ) : (
                <EyeOffIcon className="w-4 h-4 mr-1" />
              )}
              Hidden
            </button>
          </Label>
        </div>
        <Input
          id="password"
          type={!isPasswordVisible ? 'password' : 'text'}
          placeholder="***********"
          required
          className="h-12"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label
            htmlFor="password"
            className="font-normal flex w-full justify-between"
          >
            Confirm password
            <button
              className="flex items-center justify-center"
              onClick={() => {
                setPasswordVisible((prev) => !prev);
              }}
            >
              {isPasswordVisible ? (
                <EyeIcon className="w-4 h-4 mr-1" />
              ) : (
                <EyeOffIcon className="w-4 h-4 mr-1" />
              )}
              Hidden
            </button>
          </Label>
        </div>
        <Input
          id="password"
          type={!isPasswordVisible ? 'password' : 'text'}
          placeholder="***********"
          required
          className="h-12"
        />
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>
      <div className="flex items-center justify-center w-full">
        <Separator className=" w-[40%] opacity-35" />
        <span className="px-4">Or</span>
        <Separator className=" w-[40%] opacity-35" />
      </div>
      <Button variant="outline" className="w-full">
        <span className="mr-2">
          <Icons.GoogleIconColor className="h-4 w-4" />
        </span>
        Register with Google
      </Button>
    </div>
  );
};

export default RegisterForm;
