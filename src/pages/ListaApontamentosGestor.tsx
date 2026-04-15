import ApontamentosGestor from "../components/ApontamentosGestor";
import DropdownProjetos from "../components/DropdownProjetos";
import Header from "../shared/components/Header";

export default function ListaApontamentosGestor() {
    return (
        <>
            <Header />
            <div className="flex justify-around items-center border rounded-xl p-3 my-5 mx-15">
                <h1 className="text-2xl">APROVAÇÃO DOS APONTAMENTOS</h1>
                <div className="flex gap-3">
                    <DropdownProjetos
                        value=""
                        options={[
                            { label: "GSW1234", value: "Projeto A" },
                            { label: "GSW1235", value: "Projeto B" }
                        ]}
                        heightPx={38}
                    />
                    <button type="submit" className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15 self-center">Aprovar</button>
                    <button type="submit" className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15 self-center">Reprovar</button>
                </div>
            </div>
            <ApontamentosGestor />
        </>
    )
}