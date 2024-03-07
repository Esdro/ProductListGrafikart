/* eslint-disable react/prop-types */
// noinspection com.intellij.reactbuddy.ArrayToJSXMapInspection

import React, {useEffect, useMemo, useState} from 'react';
import Input from "./Components/Forms/Input.jsx";
import CheckBox from "./Components/Forms/CheckBox.jsx";
import ProductCategoryRow from "./Components/Products/CategoryRow.jsx";
import ProductRow from "./Components/Products/ProductRow.jsx";
import Range from "./Components/Forms/Range.jsx";
import useToogle from "./CustomHooks/useToogle.jsx";
import useIncrement from "./CustomHooks/useIncrement.jsx";
import {createPortal} from "react-dom";

function App () {

    const PRODUCTS = [
        {category: "Fruits", price: 15, stocked: true, name: "Apple"},
        {category: "Fruits", price: 25, stocked: true, name: "Dragonfruit"},
        {category: "Fruits", price: 4, stocked: false, name: "Passionfruit"},
        {category: "Vegetables", price: 2, stocked: true, name: "Spinach"},
        {category: "Vegetables", price: 74, stocked: false, name: "Pumpkin"},
        {category: "Vegetables", price: 21, stocked: true, name: "Peas"}
    ]

    // on crée le toggle de notre filtre de produit en stock uniquement
    const [shownOnStockOnly, setShownOnStockOnly] = useState(false);

    // on crée le champ pour controller la saisie de l'utilisateur
    const [ searchedString, setSearchedString] = useState("");

    // on crée le champ de filtre minPrice
    const [ minPrice, setMinPrice ] = useState(2);

    // on crée le champ de filtre maxPrice
    const [ maxPrice, setMaxPrice ] = useState(29);

    // on va filtrer les produits selon le stock et le terme de recherche.

    // on utilise la dérivation

    const visibleProducts = PRODUCTS.filter((product) => {
        if (shownOnStockOnly && !product.stocked) {
            return false
        }

        if (searchedString  && !product.name.toLocaleLowerCase().includes((searchedString))) {
            return false
        }

        if ( minPrice && product.price < minPrice) {
            return false;
        }

        if ( maxPrice && product.price > maxPrice) {
            return false;
        }

        return  true;
    });

    // useMemo

    const [password, setPassword] = useState("");

    const security = useMemo( () =>
        {
            return password.toLocaleLowerCase()
        }, [password]
    )

// useId


    const [checked, setChecked] = useToogle();


    const [increment, setIncrement, setDecrement] = useIncrement(15, 5);

    return(
        <>
            <div className={'container my-3 p-2'}>
                <CheckBox checked={checked} onChange={setChecked} label={''}/>
                {checked && 'Je suis coché '}

                <button type={'button'} className={'btn btn-lg text-white btn-primary btn-outline-primary'}
                        onClick={setIncrement}> Augmenter notre nombre : {increment} </button>
                <button type={'button'} className={'btn btn-lg text-white m-3 btn-primary btn-outline-primary'}
                        onClick={setDecrement}> Décrémenter notre nombre : {increment} </button>

                <div className={'row'}>
                    <div className={'col-12 p-2'}>
                        <SearchBar
                            shownOnStockOnly={shownOnStockOnly}
                            setShownOnStockOnly={setShownOnStockOnly}
                            searchedString={searchedString}
                            setSearchedString={setSearchedString}
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            password={password}
                            setPassword={setPassword}
                        />
                        <strong> Securité : </strong> {security}
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-12 p-2'}>
                        <ProductsTable products={visibleProducts}/>
                    </div>
                </div>
            </div>

        </>
    )

}


function SearchBar(
    {
        shownOnStockOnly,
        setShownOnStockOnly,
        setSearchedString,
        searchedString,
        setMinPrice, setMaxPrice,
        minPrice, maxPrice, password, setPassword
    }
) {
    return(
        <>
            <div className={'mb-3'}>
                <Input placeholder={'Rechercher '}  value={searchedString} onChange={setSearchedString} />
                <CheckBox checked={shownOnStockOnly} onChange={setShownOnStockOnly}  label="N'afficher que les produyits en stock" />
                <div className={'row'}>
                    <div className={'col-5 p-2 mx-4'}>
                        <strong> Prix minimum : </strong>
                        <Range onChange={setMinPrice} value={minPrice}/>
                    </div>
                    <div className={'col-5 p-2 mx-4'}>
                        <strong> Prix maximum : </strong>
                        <Range onChange={setMaxPrice} value={maxPrice}/>
                    </div>
                </div>
                <Input value={password} onChange={setPassword} placeholder={'Mot de passe'}/>
            </div>
        </>
    )
}

function ProductsTable({products}) {

    const rows = [];
    let lastCategory = null;



    products.forEach(product => {

        // je regarde la catégorie du produit index : si la catégorie diffère, je passe à l'enregistrement du nom
        if (product.category !== lastCategory) {
            // j'ajoute une ligne de Catégorie
            rows.push(<ProductCategoryRow name={product.category} key={product.category} />)
        }
        // j'actualise lastCategory
        lastCategory = product.category;

        // on ajoute une ligne de produit à notre conteneur de ligne
        rows.push(<ProductRow key={product.name} product={product} />)
    })

    return <>
        <table className={'table table-hovered table-striped'} >
           <thead>
           <tr>

               <td><strong>Nom</strong></td>
               <td><strong>Prix</strong></td>
           </tr>
           </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    </>

}



export default App;