import './CategoryPannel.css'; // Import the CSS file


const CategoryPannel = () => {
   

    return (
       <div className="cateory">
         <center><h3>Categories</h3></center>
        <div className='cat'>
        <button className='category'>Frontend Devoloper</button>
        <button className='category'>Backend Devoloper</button>
        <button className='category'>Machine Learning</button>
        <button className='category'>Game Devoloper</button>
        <button className='category'>Python Specialist</button>
        </div>
       </div>
    );
};

export default CategoryPannel;
