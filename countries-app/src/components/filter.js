import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Filter(props){
    // const [filter,setFilter] = useState('Africa');
    const [list , setList] =useState(false)
    const filterList = "bg-white rounded-md  justify-around flex-col gap-1 py-4 absolute w-full top-full translate-y-2 transform shadow-md z-30 dark:bg-blue-750"
    function handleChevronClick(e){
        console.log(e.currentTarget.checked)
        setList(e.currentTarget.checked)
    }
    function handleFilterClick(e){
        props.onFilter(e.target.textContent)
    }
    // function handleClick
    return (
        <div className="text-tiny w-56 relative font-semibold ">
            <button type="button" className="dark:bg-blue-750 bg-white w-full py-3 px-5 flex items-center justify-between rounded-sm shadow-md " >
                <span className="inline-block font-semibold">Filter by Region</span>
                <label htmlFor="filter-icon" className="inline-block cursor-pointer" tabIndex="6">
               { list ? <FontAwesomeIcon icon={['fas', 'chevron-up']} size='sm' /> : <FontAwesomeIcon icon={['fas', 'chevron-down']} size='sm' />}
                </label>
                <input type='checkbox' className="hidden appearance-none" onChange={handleChevronClick} id="filter-icon"/>
            </button>
            <ul className={list ? filterList + ' flex' : filterList + ' hidden'}>
                <li>
                    <button className="py-2 px-5 w-full text-left font-semibold text-tiny" onClick={handleFilterClick}>
                        Africa
                    </button>
                </li>
                <li>
                    <button className="py-2 px-5 w-full text-left  text-tiny font-semibold" onClick={handleFilterClick}>
                        America
                    </button>
                </li>
                <li>
                    <button className="py-2 px-5 w-full text-left  text-tiny font-semibold" onClick={handleFilterClick}>
                        Asia
                    </button>
                </li>
                <li>
                    <button className="py-2 px-5 w-full text-left  text-tiny font-semibold" onClick={handleFilterClick}>
                        Europe
                    </button>
                </li>
                <li>
                    <button className="py-2 px-5 w-full text-left  text-tiny font-semibold" onClick={handleFilterClick}>
                        Oceania
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Filter;