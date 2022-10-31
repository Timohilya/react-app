import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main";

const Pagination = observer(() => {
    const {post} = useContext(Context)
    const pageCount = Math.ceil(post.totalCount / post.limit)
    const pages = []

    useEffect(() => {
        post.setPage(1)
    }, [])

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    if ( pages.length > 1 ) {
        return (
            <div className="pagination">
                {pages.length > 1 && pages.map(page =>
                    <button key={page} className={post.page === page ? 'active' : ''} onClick={() => post.setPage(page)}>{page}</button>
                )}
            </div>
        );
    }
});

export default Pagination;
