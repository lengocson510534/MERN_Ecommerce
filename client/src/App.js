import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'
import { Login, Home, Public, Products, FAQ, Services, DetailProduct, Blogs } from './pages/publics'
import { getCategories } from './store/app/asyncAction';
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className='min-h-screen font-main text-main-gray'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
