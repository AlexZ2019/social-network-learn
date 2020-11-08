import React, {useState} from "react";
// import style from "./Paginator.module.css";

type PropsType = {
    currentPage?: number,
    totalItemsCount: number,
    pageSize: number,
    onPageChanged?: (page: number) => void,
    portion?: number
}

let Paginator: React.FC<PropsType> = ({currentPage= 1, totalItemsCount, pageSize, onPageChanged = x => x, portion = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
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
            // className={currentPage === page && style.selectedPage} - in span attributes
            return (
                <span
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