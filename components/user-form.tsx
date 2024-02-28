"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/5wplCaCVpF1
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Formik, Form } from "formik";
import { useState } from "react";
import {
  Product,
  Products,
  UserInteraction,
  UserInteractions,
} from "../app/lib/Database";
import { generateUserDescriptionFromTheServer } from "@/app/lib/actions";
import { UserInferredInfo } from "@/app/lib/types";
import {
  USER_CLUSTERING,
  USER_BASIC_INTERESTS,
  USER_COMMUNICATION_STYLE,
  USER_SENTIMENT_ANALYSIS,
} from "../app/lib/constants";
import Tag from "./ui/tag";

type UserInfoForm = {
  name: string;
  age: number;
  productDescriptions: Array<Product["description"]>;
  customProductDescription: string;
  userInteractions: Array<UserInteraction["text"]>;
  customUserInteraction: string;
};

export function UserForm() {
  const [initialValues] = useState<UserInfoForm>({
    name: "",
    age: 0,
    productDescriptions: [],
    customProductDescription: "",
    userInteractions: [],
    customUserInteraction: "",
  });
  const [loading, setLoading] = useState(false);
  const [userInferredInfos, setUserInferredInfos] = useState<
    UserInferredInfo[]
  >([]);

  return (
    <Formik<UserInfoForm>
      initialValues={initialValues}
      onSubmit={(values) => {
        setLoading(true);

        generateUserDescriptionFromTheServer({
          ...values,
          productDescriptions: [
            ...values.productDescriptions,
            values.customProductDescription,
          ],
          userInteractions: [
            ...values.userInteractions,
            values.customUserInteraction,
          ],
        })
          .then((newUserInferredInfo) => {
            if (newUserInferredInfo.success) {
              setUserInferredInfos((prevUserInferredInfos) => [
                ...prevUserInferredInfos,
                newUserInferredInfo,
              ]);
            }
          })
          .finally(() => setLoading(false));
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <div
            key="1"
            className="grid min-h-[600px] w-full md:min-h-[500px] lg:min-h-[500px] xl:min-h-[600px] grid-cols-1 md:grid-cols-2 border border-gray-500 mb-4 rounded font-light"
          >
            <div className="flex flex-col border-r border-gray-500">
              <div className="flex-1">
                <div className="flex items-center justify-center p-6">
                  <div className="grid gap-2 w-full sm:gap-4">
                    <h3 className="text-lg tracking-wide sm:text-xl md:text-2xl">
                      User Registration information
                    </h3>

                    <Label htmlFor="message">
                      Required information to enter when registering a new user
                    </Label>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
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
                        <Label htmlFor="name">Age</Label>
                        <Input
                          type="number"
                          id="age"
                          placeholder="Enter your age"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.age}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg tracking-wide sm:text-xl md:text-2xl">
                      Purchase history
                    </h3>

                    <Label htmlFor="message">
                      User purchase history on the app with product names and
                      descriptions
                    </Label>

                    <div className="space-y-2">
                      <div className="grid gap-2">
                        {Products.map(({ id, name, description }) => (
                          <Label
                            key={id}
                            htmlFor={name}
                            className="flex items-start text-justify"
                          >
                            <input
                              type="checkbox"
                              name="productDescriptions"
                              id={name}
                              value={description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="mr-3 mt-1"
                            />
                            {name} {"==> "}
                            {description}
                          </Label>
                        ))}

                        <div className="space-y-2 mb-4">
                          <Label htmlFor="customProductDescription">
                            Custom description:
                          </Label>
                          <Input
                            name="customProductDescription"
                            id="customProductDescription"
                            placeholder="Another product description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg tracking-wide sm:text-xl md:text-2xl">
                      User hand written text
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        User emails, customer service interactions, chatbot
                        history...
                      </Label>

                      <div className="grid gap-2">
                        {UserInteractions.map(({ id, text }) => (
                          <Label
                            className="text-justify flex items-start"
                            key={id}
                            htmlFor={id}
                          >
                            <input
                              type="checkbox"
                              name="userInteractions"
                              id={id}
                              value={text}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="mr-3 mt-1"
                            />
                            {text}
                          </Label>
                        ))}
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="customProductDescription">
                          Custom user interaction:
                        </Label>
                        <Textarea
                          className="min-h-[8rem] max-h-[12rem]"
                          id="message"
                          name="customUserInteraction"
                          placeholder="Enter your message"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.customUserInteraction}
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={loading}>
                      <span className="flex items-center">
                        {loading && (
                          <LoaderIcon className="animate-spin h-5 w-5 mr-2" />
                        )}
                        Send Form
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex-1">
                <div className="p-6 grid gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg tracking-wide sm:text-xl md:text-2xl mb-4">
                      User Inferred Information
                    </h3>
                    {userInferredInfos
                      .map((userInferredInfo, index) => (
                        <div
                          key={index}
                          className="border border-gray-500 shadow-left-lg p-4 mb-4 rounded"
                        >
                          <h2 className="text-xl tracking-wide">
                            Interaction {index + 1}:
                          </h2>
                          <h3 className="mt-4 text-l tracking-wide">
                            Clustering
                          </h3>
                          <Tag
                            categories={USER_CLUSTERING}
                            response={userInferredInfo.user_clustering}
                          />
                          <h3 className="mt-2 text-l tracking-wide">
                            Interests
                          </h3>
                          <Tag
                            categories={USER_BASIC_INTERESTS}
                            response={userInferredInfo.user_basic_interests}
                          />
                          <h3 className="mt-2 text-l tracking-wide">
                            Communication style
                          </h3>
                          <Tag
                            categories={USER_COMMUNICATION_STYLE}
                            response={userInferredInfo.user_communication_style}
                          />
                          <h3 className="mt-2 text-l tracking-wide">
                            Sentiment analysis
                          </h3>
                          <Tag
                            categories={USER_SENTIMENT_ANALYSIS}
                            response={userInferredInfo.user_sentiment_analysis}
                          />
                        </div>
                      ))
                      .reverse()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function LoaderIcon(props: React.SVGProps<SVGSVGElement>) {
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
