import SearchBox from "@/features/talen/components/talen-search";
import { PageHeader } from "@/components/PageHeader";

const TalentPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-2">
      <PageHeader
        title="YF Talen 2025"
        description="Find YF Talen participants and check contributions"
      />
      <SearchBox />
    </div>
  );
};

export default TalentPage;
