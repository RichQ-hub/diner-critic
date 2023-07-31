import "./FilterAside.css";

export default function FilterAside() {
    return (
        <aside className="filter">
            <div className="filter-wrapper">
                <div className="filter-content">
                    <h2 className="filter-title">Filters</h2>
                    <div className="filter-price">
                        <h3>Price Range</h3>
                    </div>
                    <div className="filter-location">
                        <h3>Location</h3>
                    </div>
                </div>
            </div>
        </aside>
    )
}
