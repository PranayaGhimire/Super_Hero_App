import React, { useEffect, useState } from 'react'
import { FadeLoader, MoonLoader } from 'react-spinners';

const App = () => {
  const [name,setName]=useState(null);
  const [image,setImage]=useState(null);
  const [combat,setCombat]=useState(0);
  const [durability,setDurability]=useState(0);
  const [intelligence,setIntelligence]=useState(0);
  const [power,setPower]=useState(0);
  const [speed,setSpeed]=useState(0);
  const [strength,setStrength]=useState(0);
  
  const [value,setValue]=useState('');

  const [isLoading,setIsLoading]=useState(false);

  const accessToken='119dd9611f58c31aa538910792968271'
  const baseUrl=`https://superheroapi.com/api.php/${accessToken}`
  useEffect(()=>{
      getSuperHeroById(157);
  },[])
  
  const getSuperHeroById = async(id)=>{
    setIsLoading(true);
    const response=await fetch(`${baseUrl}/${id}`);
    const data=await response.json();
    // console.log(data);
    setName(data.name);
    setImage(data.image.url)
    setCombat(data.powerstats.combat)
    setIntelligence(data.powerstats.intelligence)
    setPower(data.powerstats.power)
    setSpeed(data.powerstats.speed)
    setStrength(data.powerstats.strength)
    setIsLoading(false);
  }
  
  const getSuperHeroByName = async(name)=>{
    try {
      setIsLoading(true);
    const response=await fetch(`${baseUrl}/search/${name}`);
    const data=await response.json();
    console.log(data);
    alert(data.error);
    // console.log(data.results[0]);
    const hero=data.results[0];
    setName(hero.name);
    setImage(hero.image.url);
    setCombat(hero.powerstats.combat);
    setDurability(hero.powerstats.durability);
    setIntelligence(hero.powerstats.intelligence);
    setPower(hero.powerstats.power);
    setSpeed(hero.powerstats.speed);
    setStrength(hero.powerstats.strength);
    setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className='min-h-screen bg-gradient-to-bl from-zinc-900 to-zinc-700 flex justify-center items-center text-white'>
      <div className='flex flex-col justify-center items-center space-y-3 mt-10 mb-10'>
        <h1 className='text-2xl mb-5 font-bold text-yellow-600'>Super Hero App</h1>
        <div className='space-x-3'>
          <input 
          onChange={(e)=>setValue(e.target.value)} value={value}
          type="text" className='bg-zinc-700 p-2 rounded-lg outline-none' placeholder='Enter your SuperHero' />
          <button
          onClick={()=>getSuperHeroByName(value)}
          className='bg-green-600 p-2 rounded-lg w-24 hover:bg-green-700 cursor-pointer'>Search</button>
        </div>
                  
          <button 
         onClick={()=>getSuperHeroById(Math.floor(Math.random()*731)+1)}
          className='bg-blue-600 p-2 rounded-lg hover:bg-blue-700 cursor-pointer'>Get Random SuperHero</button>
          {isLoading?(
            <MoonLoader size='40px' color='white' speedMultiplier='1'/>
          ):(<div>
          <h1 className='text-2xl font-bold text-yellow-600 text-center mb-3'>{name}</h1>
          <img src={image} alt="Super Hero Image" className='w-60 h-60 rounded-md' />
          <h1 className='text-xl font-bold text-yellow-600 underline mt-3 mb-2'>Power Stats</h1>
          <p className='text-green-500'>{`Combat: ${combat}`}</p>
          <p className='text-green-500'>{`Durability: ${durability?durability:null}`}</p>
          <p className='text-green-500'>{`Intelligence: ${intelligence}`}</p>
          <p className='text-green-500'>{`Power: ${power}`}</p>
          <p className='text-green-500'>{`Speed: ${speed}`}</p>
          <p className='text-green-500'>{`Strength: ${strength}`}</p>
          </div>)}
          
      </div>
    </div>
  )
}

export default App
