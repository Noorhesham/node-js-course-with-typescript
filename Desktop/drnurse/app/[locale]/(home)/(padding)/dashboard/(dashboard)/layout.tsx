import BreadCrumb from "@/app/components/BreadCrumb";
import GridContainer from "@/app/components/GridContainer";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import SideBar from "@/app/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper className="">
      <GridContainer className=" gap-4" cols={12}>
        <div className=" col-span-1">
          <SideBar iconsOnly />
        </div>
        <div className=" col-span-11">{children}</div>
      </GridContainer>
    </MaxWidthWrapper>
  );
}
