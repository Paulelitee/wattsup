

export default function SelectAppliances(){

    const appliances = [
        "fridge", "tv set", "mircrowave oven", "water dispenser"
    ]

    return <div className="p-4">
        <div className="text-gray-500 rounded-3xl bg-white p-4">
            <input placeholder="search appliances"/>
            <div className="flex flex-row gap-2">
                {appliances.map((appliance, id) => <p
                    className="appliance"
                    key = {id}>{appliance}</p>)}
            </div>
        </div>
 </div>
}