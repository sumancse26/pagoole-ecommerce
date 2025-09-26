import ProductList from '@components/Products/ProductList';
import { getVendorProducts } from '@/services/product';
import { getCategoryList } from '@/services/categories';
import { getBrandList } from '@/services/brand';
import { getWeightsList } from '@/services/weight';

const ProductPage = async () => {
    const res = await getVendorProducts();
    const prodList = res.products_list || [];

    const cat = await getCategoryList();
    const categoryList = cat.categories || [];

    const brand = await getBrandList();
    const brandList = brand.brands || [];

    const weight = await getWeightsList();
    const weightList = weight.weights || [];

    return <ProductList prodList={prodList} categoryList={categoryList} brandList={brandList} uomList={weightList} />;
};

export default ProductPage;
