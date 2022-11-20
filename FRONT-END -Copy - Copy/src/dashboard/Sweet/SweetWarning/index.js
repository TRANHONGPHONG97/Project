import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ProductService from '../../services/ProductService';

function AlertWarning(props) {
    const { id } = props;
    const [reRender, setReRender] = useState(false)
    function handleClick() {
        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            text: "You won't be able to revert this!",
            footer: '',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            // onOpen: () => {
            //     console.log('chi day');
            // },
        }).then((result) => {
            async function deleteProduct(id) {
                await ProductService.DeleteProduct(id);
                setReRender(!reRender)
            }
            deleteProduct(id);

            if (result.value) {
                console.log('result.value');
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    }

    return (
        <button className="btn btn-outline-danger ml-2" onClick={handleClick}>
            Remove
        </button>
    );
}

export default AlertWarning;
