/**
 * Ligne de produit dans un tableau à deux colonnes (nom et prix)
 * @param {{name:string, stocked: boolean, price: string}} product
 * @returns {JSX.Element}
 * @constructor
 */
export default  function ProductRow({product}) {


    const style= product.stocked ? undefined : {color: 'red'};


    return <>
        <tr>
            <td className={'table-td'} style={style}> {product.name}</td>
            <td> €{product.price}   </td>
        </tr>
    </>


}

