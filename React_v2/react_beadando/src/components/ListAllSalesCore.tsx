import {useQuery, useMutation} from 'react-query';
import {getBaseURL} from "../BacendConfig.ts";

interface Item {
    itemId: number;
    personId: number;
    saleId: number;
    personName: string;
    datetime: string;
    productName: string;
    quantity: number;
    price: number;
    editable: boolean;
}

const fetchItemsWithPersonAndSaleData = async () => {
    const response = await fetch(getBaseURL() + 'items-with-person-and-sale-data', {
        method: 'GET',
    });
    const data = await response.json();
    return data.items.map((item: unknown[]) => ({
        itemId: item[0],
        personId: item[1],
        saleId: item[2],
        personName: item[3] || '',
        datetime: convertToDateTime(item[4] || ''),
        productName: item[5] || '',
        quantity: item[6] || 0,
        price: item[7] || 0,
        editable: false,
    }));
};

const convertToDateTime = (datetime: unknown): string => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const date = new Date(datetime);
    return date.toISOString().slice(0, 16);
};

export const listAllSalesCore = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const [] = useState<Item[]>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: itemsData = [], refetch} = useQuery<Item[]>(
        'salesData',
        fetchItemsWithPersonAndSaleData
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const editItemMutation = useMutation((updatedItem: Item) =>
        fetch(getBaseURL() + 'api/update-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const closeItemMutation = useMutation((updatedItem: Item) =>
        fetch(getBaseURL() + 'api/close-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const deleteItemMutation = useMutation((updatedItem: Item) =>
        fetch(getBaseURL() + 'api/delete-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
    );

    const editItem = async (item: Item) => {
        try {
            const updatedItem = {...item, editable: true};
            await editItemMutation.mutateAsync(updatedItem);
            await refetch();
            console.log("Updated successfully");
        } catch (error) {
            console.error('Failed to edit item:', error);
        }
    };

    const closeItem = async (item: Item) => {
        try {
            const updatedItem = {...item};
            await closeItemMutation.mutateAsync(updatedItem);
            await refetch();
        } catch (error) {
            console.error('Failed to close item:', error);
        }
    };

    const deleteItem = async (item: Item) => {
        try {
            const updatedItem = {...item};
            await deleteItemMutation.mutateAsync(updatedItem);
            await refetch();
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    return {
        items: itemsData,
        editItem,
        closeItem,
        deleteItem
    };
};
