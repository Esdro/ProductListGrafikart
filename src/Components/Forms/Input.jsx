
/**
 *
 * @param {string} placeholder
 * @param {string} value
 * @param { (s: string) => void}  onChange
 * @returns {JSX.Element}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
export default function Input({placeholder, value, onChange} ) {




    return (
        <div className="SearchBar">
            <h1> Je saisis ma recherche </h1>
           <input
               value={value}
               className="form-control form-control-sm"
               onChange={(e) => onChange(e.target.value)}
               placeholder={placeholder}
           />
        </div>
    )
}
