import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function Home() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading className="text-primary">
          Extended NEBB
        </PageHeaderHeading>
        <PageHeaderDescription>
          Explore transactions from top players of the Namada Shielded
          Expedition
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
