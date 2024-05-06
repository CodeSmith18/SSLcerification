import React , {useState} from "react";
import axios from 'axios';

function SSLChecker(){
    const[domain , setDomain] = useState('');
    const[response,setResponse]= useState('');
    console.log(domain);
    console.log(response);

    const handleSubmit = async(e) =>{
        
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:4000/check-ssl',{domain});
            setResponse(JSON.stringify(res.data));
        }
        catch(error){
            console.error('Error:',error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                 type="text"
                  value={domain}
                  onChange={(e)=> setDomain(e.target.value)}
                  placeholder="Enter Domian"
                  />
                  <button type ="submit">Check SSL</button>
            </form>
            <div>
                {response}
                <h3>{response.daysRemaining}</h3>
            </div>
        </div>
    );
}
export default SSLChecker;