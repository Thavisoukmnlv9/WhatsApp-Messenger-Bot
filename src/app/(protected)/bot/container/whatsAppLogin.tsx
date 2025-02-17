import { Button, Card, Separator } from "@/components/ui"
import { Info, Settings, Lock, ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface Props {
    handlePrevious?: () => void;
}
export default function WhatsAppLogin({ handlePrevious }: Props) {
  return (
    <div>
      <div className=" flex items-center justify-center p-4">
        <Card className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-[32px] font-normal text-[#1f1f1f]">Log into WhatsApp Web</h1>
                <p className="text-[#1f1f1f] text-base">
                                Message privately with friends and family using WhatsApp on your browser.
                </p>
              </div>

              <ol className="space-y-4 list-decimal list-outside ml-5 text-[#1f1f1f]">
                <li>Open WhatsApp on your phone</li>
                <li className="flex items-center gap-1">
                                Tap{" "}
                  <span className="font-medium flex items-center">
                                    Menu <Info className="h-4 w-4 mx-1" />
                  </span>{" "}
                                on Android, or{" "}
                  <span className="font-medium flex items-center">
                                    Settings <Settings className="h-4 w-4 mx-1" />
                  </span>{" "}
                                on iPhone
                </li>
                <li>
                                Tap <span className="font-medium">Linked devices</span> and then{" "}
                  <span className="font-medium">Link a device</span>
                </li>
                <li>Point your phone at this screen to scan the QR code</li>
              </ol>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <a href="#" className="text-[#008069] hover:underline inline-flex items-center">
                                    Need help getting started?
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src={`/image/whatsappQR.png`}
                alt="WhatsApp Web QR Code"
                width={264}
                height={264}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground gap-1.5">
            <Lock className="h-4 w-4" />
                    Your personal messages are end-to-end encrypted
          </div>
        </Card>
      </div>
      <Separator className="my-3" />
      <div className=" space-x-3 my-3">
        <>
          <Button variant="outline" onClick={handlePrevious} className="w-full sm:w-auto" > ກັບຄືນ </Button>
          <Button >ໄປຕໍ່</Button>
        </>
      </div>
    </div>
  )
}