"use client";
import { Card, CardContent } from "@/components/ui";

import { StepIndicator } from "@/components/containers/StepIndicator";
import { type Step, useMultiStepForm } from "src/app/hook/useMultiStepForm";
import { useBotForm } from "../hook/useForm";
import { BotForm } from "../container/form";
import { SuccessStep } from "../container/successStep";
import WhatsAppLogin from "../container/whatsAppLogin";

const FORM_STEPS: Step[] = [
  { number: 1, title: "Creating a bot" },
  { number: 2, title: "Connecting to WhatsApp" },
  { number: 3, title: "Finish" },
];

export default function BotCreate() {
  const { step, handleNext, handlePrevious, handleStepClick, handleReset } = useMultiStepForm(FORM_STEPS);
  const { form, onSubmit } = useBotForm({  handleNext });

  const handleResetForm = () => {
    form.reset();
    handleReset();
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <BotForm form={form} onSubmit={onSubmit}/>
      case 2:
        return  <WhatsAppLogin handlePrevious={handlePrevious} />
      case 3:
        return <SuccessStep handleReset={handleResetForm} />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full bg-gradient-to-b p-4 flex items-center justify-center">
      <Card className="w-full  mx-auto shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-8 px-2">
            <StepIndicator steps={FORM_STEPS} currentStep={step} onStepClick={handleStepClick} />
          </div>
          <div
            key={step}
            className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-300"
          >
            <div className="space-y-2 px-5">
              <h2 className="text-sm font-medium text-muted-foreground">ຂັ້ນຕອນ {step} ໃນ 3</h2>
            </div>
            {renderStepContent()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

