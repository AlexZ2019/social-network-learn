import React, {useState} from "react";
import style from "./Pagunator.module.css";


let Paginator = ({currentPage, totalItemsCount, pageSize, onPageChanged, portion = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionPages = Math.ceil(pagesCount / portion)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portion + 1
    let rightPortionNumber = portionNumber * portion
    return <div>
        {portionNumber > 1
            && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>
        }

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber).map(page => {
            return (
                <span className={currentPage === page && style.selectedPage}
                      onClick={(e) => {
                          onPageChanged(page)
                      }}
                >
                         {' ' + page + ' '}
                    </span>
            )
        })}
        {portionPages > portionNumber && <button onClick={() =>{setPortionNumber(portionNumber + 1)}}>NEXT</button>}
    </div>
}

export default Paginator;