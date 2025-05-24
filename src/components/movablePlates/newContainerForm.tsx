import { Firm } from "@prisma/client";
import MovablePlate, { MovablePlateProps } from "../movablePlate";

export default function NewContainerForm(props: MovablePlateProps) {
  const firms: Firm[] = [];
  return (
    <MovablePlate
      {...props}
      upperBar={
        <div className="flex flex-row gap-2">
          <button
            type="submit"
            className="bg-blue-300 text-white w-20 px-2 rounded-lg hover:bg-blue-400 "
          >
            Kaydet
          </button>
          <button
            type="button"
            className="bg-red-300 text-white w-20 px-2 rounded-lg hover:bg-red-400 "
            onClick={() => {
              if (props.onHide) {
                props.onHide();
              }
            }}
          >
            İptal
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="w-20">Konteyner No</div>
          <input
            type="text"
            name="number"
            className="border rounded p-1 w-full"
            placeholder="Konteyner No"
          />
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-20">Konteyner Türü</div>
          <input
            type="text"
            name="type"
            className="border rounded p-1 w-full"
            placeholder="Konteyner Türü"
          />
        </div>
        {/* <div className="flex flex-row gap-2">
            <div className="w-20">Konteyner Rengi</div>
            <input
                type="text"
                name="color"
                className="border rounded p-1 w-full"
                placeholder="Konteyner Rengi"
            />
        </div> */}
        <div className="flex flex-row gap-2">
          <div className="w-20">Konteyner Açıklaması</div>
          <input
            type="text"
            name="description"
            className="border rounded p-1 w-full"
            placeholder="Konteyner Açıklaması"
          />
        </div>
        {/* <div className="flex flex-row gap-2">
            <div className="w-20">Konteyner Fotoğrafı</div>
            <input
                type="file"
                name="photo"
                className="border rounded p-1 w-full"
                placeholder="Konteyner Fotoğrafı"
            />
        </div> */}
        <div className="flex flex-row gap-2">
          <div className="w-20">Firma</div>
          <select name="firmId" className="border rounded p-1 w-full">
            {firms.map((firm) => (
              <option key={firm.firmShortName} value={firm.firmShortName}>
                {firm.firmName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </MovablePlate>
  );
}
