/**
 * Ligne d'une catégorie de produit
 * @param {string} name
 * @returns {JSX.Element}
 * @constructor
 */

export default function  ProductCategoryRow ({name}) {

    return <>

        <tr>
            <td className={'td'} colSpan={2} ><strong> {name}</strong> </td>
        </tr>
    </>
}