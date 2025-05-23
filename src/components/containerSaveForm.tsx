import DropDownList from "./dropDownList";
import { Firm, Container } from "@prisma/client";
import { saveContainer } from "@/utils/actions/saveContainer";
import { useActionState, useEffect, useState } from "react";

export default function ContainerSaveForm({
  container,
  firms,
}: {
  container: Container;
  firms: Firm[];
}) {
  const defaultSelectedFirm = firms.find(
    (firm) => firm.firmShortName === container.firmId
  );
  const [selectedFirm, setSelectedFirm] = useState(defaultSelectedFirm);
  const dropdownOptions = firms.map((firm) => ({
    value: firm.firmShortName,
    label: firm.firmName,
  }));
  const [formState, formAction] = useActionState(
    saveContainer.bind(null, {
      container,
      selectedFirmId: selectedFirm?.firmShortName ?? "",
    }),
    {
      message: null,
    }
  );

  useEffect(() => {
    //I created this useEffect after long debugging, because when the data fetching is done, the DropDownList was defaulting to the first element of the list.
    if (defaultSelectedFirm) {
      setSelectedFirm(defaultSelectedFirm);
    }
  }, [defaultSelectedFirm]);

  const handleSelect = (value: string) => {
    const selectedFirm = firms.find((firm) => firm.firmShortName === value);
    if (!selectedFirm) {
      console.error("Selected firm not found");
      return;
    }
    setSelectedFirm(selectedFirm);
  };


  return (
    <form
      action={formAction}
      className="flex flex-row gap-2 border p-2 m-2 align-bottom"
    >
      <div>
        {container.recordNo}
        <button className="bg-blue-300 text-white px-2 rounded text-sm hover:bg-blue-400">
          Keydet
        </button>
      </div>
      <DropDownList
        options={dropdownOptions}
        onSelect={handleSelect}
        defaultLabel={defaultSelectedFirm?.firmName}
      />
      <div>{formState.message}</div>
    </form>
  );
}
