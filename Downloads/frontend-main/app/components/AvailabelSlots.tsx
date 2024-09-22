import Head1 from "@/app/components/defaults/Head1";
import GridContainer from "@/app/components/defaults/GridContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Container from "./Container";

const AvailableSlots = () => {
  return (
    <div className=" flex items-center flex-col">
      <Head1 size="text-xl" className=" my-3" title="مواعيد الحجز" />
      <Tabs defaultValue="saturday" className="w-full">
        <TabsList className="flex gap-4">
          <TabsTrigger value="saturday" className="px-4 flex-1 py-2">
            السبت
          </TabsTrigger>
          <TabsTrigger value="sunday" className="px-4 flex-1 py-2">
            الأحد
          </TabsTrigger>
          <TabsTrigger value="monday" className="px-4 flex-1 py-2">
            الاثنين
          </TabsTrigger>
          {/* Add more days as needed */}
        </TabsList>

        {/* Content for Saturday */}
        <TabsContent dir="rtl" value="saturday" className="py-4 flex flex-col gap-3">
          <h3 className="text-main font-semibold text-lg">اليوم : السبت</h3>
          <GridContainer cols={3}>
            <Container>
              <RadioGroup>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot1" id="r1" />
                  <Label htmlFor="r1">من الساعة 9 ل 10</Label>
                </div>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot2" id="r2" />
                  <Label htmlFor="r2">من الساعة 10 ل 11</Label>
                </div>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot3" id="r3" />
                  <Label htmlFor="r3">من الساعة 11 ل 12</Label>
                </div>
              </RadioGroup>
            </Container>
          </GridContainer>
        </TabsContent>

        {/* Content for Sunday */}
        <TabsContent value="sunday" className="pt-4">
          <h3 className="text-main font-semibold text-lg">اليوم : الأحد</h3>
          <GridContainer cols={3}>
            <Container>
              <RadioGroup>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot4" id="r4" />
                  <Label htmlFor="r4">من الساعة 9 ل 10</Label>
                </div>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot5" id="r5" />
                  <Label htmlFor="r5">من الساعة 10 ل 11</Label>
                </div>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot6" id="r6" />
                  <Label htmlFor="r6">من الساعة 11 ل 12</Label>
                </div>
              </RadioGroup>
            </Container>
          </GridContainer>
        </TabsContent>

        {/* Content for Monday */}
        <TabsContent value="monday" className="pt-4">
          <h3 className="text-main font-semibold text-lg">اليوم : الاثنين</h3>
          <GridContainer cols={3}>
            <Container>
              <RadioGroup>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot7" id="r7" />
                  <Label htmlFor="r7">من الساعة 9 ل 10</Label>
                </div>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot8" id="r8" />
                  <Label htmlFor="r8">من الساعة 10 ل 11</Label>
                </div>
                <div className="flex flex-row-reverse gap-2 items-center space-x-2">
                  <RadioGroupItem value="slot9" id="r9" />
                  <Label htmlFor="r9">من الساعة 11 ل 12</Label>
                </div>
              </RadioGroup>
            </Container>
          </GridContainer>
        </TabsContent>
      </Tabs>
      <Button className=" w-[80%]">تأكيد الحجز</Button>
    </div>
  );
};

export default AvailableSlots;
