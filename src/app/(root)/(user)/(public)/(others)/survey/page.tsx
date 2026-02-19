"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  ChevronRight,
  Leaf,
  Heart,
  Sparkles,
  ShoppingBag,
  Calendar,
  Users,
  Apple,
  Salad,
} from "lucide-react";

interface FormData {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  age: string;

  // Dietary Preferences
  dietType: string[];
  allergies: string[];
  customAllergy: string;

  // Shopping Habits
  frequency: string;
  budget: string;
  priorities: string[];

  // Nutritional Goals
  goals: string[];
  healthConditions: string[];
  customCondition: string;

  // Lifestyle
  familySize: string;
  cookingFrequency: string;
  mealPrepTime: string;

  // Preferences
  favoriteProducts: string[];
  avoidProducts: string[];
  organicImportance: string;
}

export default function page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    age: "",
    dietType: [],
    allergies: [],
    customAllergy: "",
    frequency: "",
    budget: "",
    priorities: [],
    goals: [],
    healthConditions: [],
    customCondition: "",
    familySize: "",
    cookingFrequency: "",
    mealPrepTime: "",
    favoriteProducts: [],
    avoidProducts: [],
    organicImportance: "",
  });

  const totalSteps = 5;

  const handleMultiSelect = (field: keyof FormData, value: string) => {
    const currentValues = formData[field] as string[];
    if (currentValues.includes(value)) {
      updateFormData(
        field,
        currentValues.filter((v) => v !== value),
      );
    } else {
      updateFormData(field, [...currentValues, value]);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#004b1a] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Leaf className="w-8 h-8 text-[#edefea]" />
          </div>
          <h1 className="font-dream-orphans text-5xl md:text-6xl tracking-[4px] mb-4">
            Your Nutrition Journey
          </h1>
          <p className=" text-[#edefea] text-lg max-w-2xl mx-auto">
            Help us personalize your Red Otter Farms experience
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[#edefea] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center border  mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-['Raleway',sans-serif] font-bold border-2 transition-colors ${
                    step < currentStep
                      ? "bg-[#004b1a] border-[#004b1a] text-white"
                      : step === currentStep
                        ? "bg-[#d7262d] border-[#d7262d] text-white"
                        : "bg-white border-[#004b1a]/20 text-[#1b1a21]/40"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step
                  )}
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 w-3 mx-2 transition-colors ${
                      step < currentStep ? "bg-[#004b1a]" : "bg-[#004b1a]/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className=" text-[#1b1a21] text-sm uppercase tracking-[2px]">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className=" text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                Getting Started
              </div>
              <h2 className="font-dream-orphans text-[#004b1a] text-5xl tracking-[3px] mb-4">
                Tell Us About You
              </h2>
              <p className=" text-[#1b1a21] text-lg">
                Basic information to get started
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="w-full border-2 border-[#004b1a] rounded-lg px-6 py-4  text-[#1b1a21] focus:outline-none focus:border-[#d7262d] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full border-2 border-[#004b1a] rounded-lg px-6 py-4  text-[#1b1a21] focus:outline-none focus:border-[#d7262d] transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="w-full border-2 border-[#004b1a] rounded-lg px-6 py-4  text-[#1b1a21] focus:outline-none focus:border-[#d7262d] transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-3">
                  Age Group *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["18-25", "26-35", "36-50", "50+"].map((age) => (
                    <button
                      key={age}
                      onClick={() => updateFormData("age", age)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all ${
                        formData.age === age
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Dietary Preferences */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#004b1a]/10 rounded-full mb-6">
                <Apple className="w-8 h-8 text-[#004b1a]" />
              </div>
              <div className=" text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                Your Diet
              </div>
              <h2 className="font-dream-orphans text-[#004b1a] text-5xl tracking-[3px] mb-4">
                Dietary Preferences
              </h2>
              <p className=" text-[#1b1a21] text-lg">
                Help us understand your dietary needs
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  Diet Type (Select all that apply)
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Vegetarian",
                    "Vegan",
                    "Pescatarian",
                    "Keto",
                    "Paleo",
                    "Gluten-Free",
                    "Dairy-Free",
                    "No Restrictions",
                    "Other",
                  ].map((diet) => (
                    <button
                      key={diet}
                      onClick={() => handleMultiSelect("dietType", diet)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all text-left flex items-center gap-3 ${
                        formData.dietType.includes(diet)
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {formData.dietType.includes(diet) && (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="flex-1">{diet}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  Food Allergies (Select all that apply)
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Nuts",
                    "Dairy",
                    "Gluten",
                    "Soy",
                    "Eggs",
                    "Shellfish",
                    "None",
                  ].map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => handleMultiSelect("allergies", allergy)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all text-left flex items-center gap-3 ${
                        formData.allergies.includes(allergy)
                          ? "bg-[#d7262d] border-[#d7262d] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {formData.allergies.includes(allergy) && (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="flex-1">{allergy}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-3">
                  Other Allergies or Restrictions
                </label>
                <textarea
                  value={formData.customAllergy}
                  onChange={(e) =>
                    updateFormData("customAllergy", e.target.value)
                  }
                  rows={3}
                  className="w-full border-2 border-[#004b1a] rounded-lg px-6 py-4  text-[#1b1a21] focus:outline-none focus:border-[#d7262d] transition-colors resize-none"
                  placeholder="Please specify any other dietary restrictions..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Shopping Habits */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#004b1a]/10 rounded-full mb-6">
                <ShoppingBag className="w-8 h-8 text-[#004b1a]" />
              </div>
              <div className=" text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                Your Habits
              </div>
              <h2 className="font-dream-orphans text-[#004b1a] text-5xl tracking-[3px] mb-4">
                Shopping Preferences
              </h2>
              <p className=" text-[#1b1a21] text-lg">
                Tell us about your grocery shopping routine
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  How Often Do You Shop for Groceries? *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Daily",
                    "2-3 times per week",
                    "Once a week",
                    "Bi-weekly",
                  ].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => updateFormData("frequency", freq)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all ${
                        formData.frequency === freq
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  Monthly Grocery Budget *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Under ₹5,000",
                    "₹5,000 - ₹10,000",
                    "₹10,000 - ₹20,000",
                    "Above ₹20,000",
                  ].map((budget) => (
                    <button
                      key={budget}
                      onClick={() => updateFormData("budget", budget)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all ${
                        formData.budget === budget
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  Shopping Priorities (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Organic Products",
                    "Price/Value",
                    "Freshness",
                    "Local Sourcing",
                    "Sustainability",
                    "Variety",
                    "Convenience",
                    "Nutritional Value",
                  ].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => handleMultiSelect("priorities", priority)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all text-left flex items-center gap-3 ${
                        formData.priorities.includes(priority)
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {formData.priorities.includes(priority) && (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="flex-1">{priority}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Nutritional Goals */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#004b1a]/10 rounded-full mb-6">
                <Heart className="w-8 h-8 text-[#d7262d]" />
              </div>
              <div className=" text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                Your Health
              </div>
              <h2 className="font-dream-orphans text-[#004b1a] text-5xl tracking-[3px] mb-4">
                Nutritional Goals
              </h2>
              <p className=" text-[#1b1a21] text-lg">
                Share your wellness objectives
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  What Are Your Health Goals? (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Weight Management",
                    "Build Muscle",
                    "Increase Energy",
                    "Better Immunity",
                    "Digestive Health",
                    "Heart Health",
                    "Mental Clarity",
                    "General Wellness",
                  ].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleMultiSelect("goals", goal)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all text-left flex items-center gap-3 ${
                        formData.goals.includes(goal)
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {formData.goals.includes(goal) && (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="flex-1">{goal}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  Health Conditions We Should Know About (Optional)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Diabetes",
                    "High Blood Pressure",
                    "High Cholesterol",
                    "PCOS",
                    "Thyroid Issues",
                    "None",
                  ].map((condition) => (
                    <button
                      key={condition}
                      onClick={() =>
                        handleMultiSelect("healthConditions", condition)
                      }
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all text-left flex items-center gap-3 ${
                        formData.healthConditions.includes(condition)
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {formData.healthConditions.includes(condition) && (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="flex-1">{condition}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-3">
                  Additional Health Notes
                </label>
                <textarea
                  value={formData.customCondition}
                  onChange={(e) =>
                    updateFormData("customCondition", e.target.value)
                  }
                  rows={3}
                  className="w-full border-2 border-[#004b1a] rounded-lg px-6 py-4  text-[#1b1a21] focus:outline-none focus:border-[#d7262d] transition-colors resize-none"
                  placeholder="Any other health information you'd like to share..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Lifestyle & Preferences */}
        {currentStep === 5 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#004b1a]/10 rounded-full mb-6">
                <Salad className="w-8 h-8 text-[#004b1a]" />
              </div>
              <div className=" text-[#1b1a21] text-xs uppercase tracking-[4px] mb-2">
                Final Step
              </div>
              <h2 className="font-dream-orphans text-[#004b1a] text-5xl tracking-[3px] mb-4">
                Lifestyle & Preferences
              </h2>
              <p className=" text-[#1b1a21] text-lg">
                Almost done! Just a few more questions
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  Family Size *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["1", "2", "3-4", "5+"].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateFormData("familySize", size)}
                      className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all ${
                        formData.familySize === size
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  How Often Do You Cook? *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Daily", "4-5 times/week", "2-3 times/week", "Rarely"].map(
                    (freq) => (
                      <button
                        key={freq}
                        onClick={() => updateFormData("cookingFrequency", freq)}
                        className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all ${
                          formData.cookingFrequency === freq
                            ? "bg-[#004b1a] border-[#004b1a] text-white"
                            : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                        }`}
                      >
                        {freq}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  Meal Prep Time Preference *
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {["Under 15 min", "15-30 min", "30-60 min", "60+ min"].map(
                    (time) => (
                      <button
                        key={time}
                        onClick={() => updateFormData("mealPrepTime", time)}
                        className={`border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all ${
                          formData.mealPrepTime === time
                            ? "bg-[#004b1a] border-[#004b1a] text-white"
                            : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                        }`}
                      >
                        {time}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="block font-['Raleway',sans-serif] font-bold text-[#1b1a21] uppercase tracking-wide text-sm mb-4">
                  How Important is Organic to You? *
                </label>
                <div className="space-y-3">
                  {[
                    {
                      value: "essential",
                      label: "Essential - Only buy organic",
                    },
                    {
                      value: "important",
                      label: "Important - Prefer organic when possible",
                    },
                    {
                      value: "somewhat",
                      label: "Somewhat - For certain products only",
                    },
                    {
                      value: "not-important",
                      label: "Not Important - Price is priority",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        updateFormData("organicImportance", option.value)
                      }
                      className={`w-full border-2 rounded-lg px-6 py-4  font-bold uppercase tracking-wide text-sm transition-all text-left ${
                        formData.organicImportance === option.value
                          ? "bg-[#004b1a] border-[#004b1a] text-white"
                          : "border-[#004b1a] text-[#004b1a] hover:bg-[#004b1a]/5"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t-2 border-[#004b1a]/20">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`border-2 border-[#004b1a] text-[#004b1a]  font-bold uppercase tracking-[1.5px] px-10 py-4 rounded-[10px] transition-all ${
              currentStep === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#004b1a] hover:text-white"
            }`}
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="bg-[#d7262d] text-white  font-bold uppercase tracking-[1.5px] px-10 py-4 rounded-[10px] border-2 border-[#d7262d] hover:bg-[#b81f25] transition-colors flex items-center gap-3"
            >
              Next Step
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-linear-to-r from-[#004b1a] to-[#d7262d] text-white  font-bold uppercase tracking-[1.5px] px-12 py-4 rounded-[10px] border-2 border-transparent hover:scale-105 transition-transform flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Complete Survey
              <Sparkles className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-[#edefea] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className=" text-[#1b1a21]/60 text-sm">
            Your responses help us curate the perfect selection of products for
            your needs
          </p>
        </div>
      </div>
    </div>
  );
}
