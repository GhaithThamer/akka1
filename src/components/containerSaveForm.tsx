import DropDownList from "./dropDownList";
import { Firm, Container } from "@prisma/client";
import { saveContainer } from "@/utils/actions/saveContainer";
import { useActionState, useState } from "react";

export default function ContainerSaveForm({
  container,
  firms,
}: {
  container: Container;
  firms: Firm[];
}) {
  const defaultFirm = firms.find(
    (firm) => firm.firmShortName === container.firmId
  );
  const [selectedFirm, setSelectedFirm] = useState(defaultFirm);
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

  //   useEffect(() => {
  //     //I created this useEffect after long debugging, because when the data fetching is done, the DropDownList was defaulting to the first element of the list.
  //     if (defaultFirm) {
  //       setSelectedFirm(defaultFirm);
  //     }
  //   }, [defaultFirm]);

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
      className="flex flex-row gap-2 border p-2 m-2 align-bottom  rounded"
    >
      <div className=" w-20">
        {container.recordNo}

        {selectedFirm?.firmShortName !== defaultFirm?.firmShortName ? (
          <button
            className={
              " text-white px-2 rounded text-sm" +
              (selectedFirm?.firmShortName === defaultFirm?.firmShortName
                ? " bg-blue-300 hover:bg-blue-400"
                : " bg-red-300 hover:bg-red-400")
            }
          >
            Kaydet
          </button>
        ) : null}
      </div>
      <DropDownList
        options={dropdownOptions}
        onSelect={handleSelect}
        defaultOption={{
          value: defaultFirm?.firmShortName ?? "",
          label: defaultFirm?.firmName ?? "",
        }}
      />
      <div>{formState.message}</div>
    </form>
  );
}
