"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { SURVEY_REQUIREMENTS } from "./options";
import {
  MultiSelectQuestion,
  SingleSelectQuestion,
} from "@/components/common/surveyUI";
import AccountBreadcrumb from "../../breadcrumb";

const STORAGE_KEY = "profile-survey";

export default function Survey() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<Record<string, any>>({});
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return;

    const parsed = JSON.parse(cached);

    setData(parsed.data || {});
    const next = findNextStepIndex(parsed.data || {});
    setCurrent(next === -1 ? SURVEY_REQUIREMENTS.length - 1 : next);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data, submitted: false }),
    );
  }, [data]);

  const step = SURVEY_REQUIREMENTS[current];

  const updateValue = (value: any) => {
    setData((prev) => ({ ...prev, [step.key]: value }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FINAL SUBMIT", data);
  };

  const TOTAL_STEPS = SURVEY_REQUIREMENTS.length;

  const progressPercent = (current / TOTAL_STEPS) * 100;

  return (
    <>
      <div>
        <AccountBreadcrumb>Complete Your Profile</AccountBreadcrumb>
        <h1 className="text-[1.4rem] font-bold">Complete Your Profile</h1>
      </div>
      <div className="flex flex-col md:w-fit items-end mx-auto w-full px-4 md:px-0">
        <span className="text-xs text-muted-foreground">
          {current + 1} out of 14
        </span>
        <div className="w-full md:w-150 relative h-2 rounded-2xl bg-muted mx-auto">
          <div
            className="absolute  rounded-2xl top-1/2 -translate-y-1/2 transition-all duration-200 bg-maroon h-full "
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      <form action="" onSubmit={(e) => submitForm(e)}>
        {step.type === "single" ? (
          <SingleSelectQuestion
            {...step}
            value={data[step.key] ?? null}
            onChange={updateValue}
            onNext={() => setCurrent((c) => c + 1)}
            onBack={() => setCurrent((c) => Math.max(0, c - 1))}
          />
        ) : (
          <MultiSelectQuestion
            {...step}
            value={data[step.key] ?? []}
            onChange={updateValue}
            onNext={() => setCurrent((c) => c + 1)}
            onBack={() => setCurrent((c) => Math.max(0, c - 1))}
          />
        )}
      </form>
    </>
  );
}

function findNextStepIndex(data: Record<string, any>) {
  return SURVEY_REQUIREMENTS.findIndex((step) => data[step.key] === undefined);
}
