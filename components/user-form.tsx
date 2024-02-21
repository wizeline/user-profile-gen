"use client"
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/5wplCaCVpF1
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import { Product, Products } from "./Database";
import { generateUserDescriptionFromTheServer } from "@/app/lib/actions";



type UserInfoForm = {
  name: string;
  address: string;
  productDescriptions: Array<Product["description"]>;
  message: string;
}

export function UserForm() {

  const [initialValues] = useState<UserInfoForm>({ name: "", address: "", productDescriptions: [], message: "" })
  const [loading, setLoading] = useState(false)
  const [userDescription, setUserDescription] = useState("unknown user description")

  return (
    <Formik<UserInfoForm> initialValues={initialValues} onSubmit={(values) => {
      console.log({ values })
      setLoading(true);

      generateUserDescriptionFromTheServer({ products: values.productDescriptions.join(", ") })
        .then((userDescription) => setUserDescription(userDescription))
        .finally(() => setLoading(false));
    }}
    >

      {({
        values,
        handleChange,
        handleBlur,
      }) =>

        <Form>
          <div
            key="1"
            className="grid h-[600px] min-h-[600px] w-full md:h-[500px] lg:min-h-[500px] xl:h-[600px] grid-cols-1 md:grid-cols-2 border border-gray-200 dark:border-gray-700 dark:border-gray-800"
          >
            <div className="flex flex-col border-t md:border-t-0 md:border-l dark:border-gray-700">
              <div className="flex-1">
                <div className="flex items-center justify-center p-6">
                  <div className="grid gap-2 w-full sm:gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          placeholder="Enter your address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purchases">Purchases</Label>
                      <div className="grid gap-2">


                        {Products.map(({ id, name, description }) =>
                          <Label key={id} htmlFor={name}>
                            <input
                              type="checkbox"
                              name="productDescriptions"
                              id={name}
                              value={description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {description}
                          </Label>)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        className="min-h-[8rem] max-h-[12rem]"
                        id="message"
                        placeholder="Enter your message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                      />
                    </div>
                    <Button type="submit">
                      <span className="flex items-center">
                        {loading && <LoaderIcon className="animate-spin h-5 w-5 mr-2" />}
                        Send Form
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-t md:border-t-0 md:border-l">
              <div className="flex-1">
                <div className="p-6 grid gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium tracking-wide sm:text-xl md:text-2xl">
                      User Description
                    </h3>
                    <p className="text-sm leading-loose text-gray-500 md:text-base dark:text-gray-400">
                      {userDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      }

    </Formik>

  );
}

function LoaderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  );
}
