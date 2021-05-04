import React,{useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import axios from 'axios'
import { Button } from 'react-bootstrap';

import {Link} from 'react-router-dom'

export default function ListEvent  (){
  const [events,getEvents] =useState([]);
 
  useEffect(()=>{
    getAllEvents();},[]);
    const getAllEvents =()=>{
    axios.get('http://localhost:5000/event/events')
    .then((response)=>{
    const allEvents =response.data;
    getEvents(allEvents);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }
  
  
  return (
        <>
            <Header/>
            <br></br>
    <br></br>
    <br></br>
    <br></br>
<div  className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px' ,backgroundImage: 'url(https://www.eleapsoftware.com/wp-content/uploads/2018/02/education-and-business-background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
<span className="mask bg-gradient-default opacity-8"></span>
<h1 class="titre" style={{marginLeft:"500px",fontSize:"100",color:"white"}}>Events recommendation </h1>
<div class="overlay"></div>
<div className="container-fluid d-flex align-items-center">
  <div className="row">
    <div className="col-lg-7 col-md-10">
    </div>
  </div>
</div>
</div>



<div className="container mt-5" id="about">
               <h1 className="text-center py-4">Welcome to imProve</h1>
              
              <div className="row text-center mt-5">
          
          {   events.map( event =>(         
                <div className="col-md-3" style={{marginBottom:'20px'}}>
                 <div className="card shadow">
                  <div className="card-body">
                  <div className="py-3 text-center"> 
                  <div style={{minHeight: '140px' ,backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASMAAACtCAMAAADMM+kDAAABsFBMVEUk2s7/////0j4A2Msk3dEA18zZ9/UA2tQk4NMk49b/0jT/1j7/1D6b6+X/0jpc4dgAAADM9PFw5NsW2tF35N0lrab/2T8nOD3/0S8AADIlx74kz8Yltq4oISzg014oAAMoFSFWWV8ngH0mnpexsrSUlZcmdnQmTU8oZGUnj4v/6rKHiov300QABRaskDlsXzaC2KcOSkuL157f4ODs+/pS2b628OwoCBlZUTT//PHq005naW3QrTslLDQnRUnc3N26nDr/4IcJEhyk15QbIytu2K6y1oonbGrE1XPP1W0AICapq6woAA9BREkoGyXNzs//11fowTwAFDLY1GMoDh2YgjeKdze41X4AACGn1oxG2cI2i3xFf249OjEABS1cVTVLRzNnUSdCUkT+8MXbtjvIpzt6ajb+3XTJxF0CHDK1xm89v6sAQFD+6rF02Ko6PUJidE8WFCp7jFYgAB2v3dlwoXhUfn49YFbk4JP+9drH7dXn6LHC36XXyZ+GpWTOtHKznFRqqKWGwb2uxMSa3NZnyME7UVRgXGLI7t01JSNQPCN/gUxHaVlQrJEdAACFtIDYmrtjAAAdNUlEQVR4nO1dC2PbxpEGiAXxIEiKBEFCIGjJhEQSkeIoIkW6kkE5lmXKsSxZkR+xen60le2mbexLm7aXttderk17d732/vLtA48FCL4kOrYTfjYpEASBxYeZ2ZnZwYJhZphhhhlmmGGGGWaYYYYZZphhhhlmmGGGGWaYYYYZZpjhnQEA4E034S2HyGiaIb7pVrzVEK39UnehNpOkwQDavilKZaf6dkuSoL7Bg0tdW+JVYOzzb7ARo3Hz4RskSV00uCTLiI7pa5t6wrzJqxYD9aWuv8HDi47G5ViG7xg+Rxd0ee1tIcmT7htvskVitSFyHLBKkrtCfSgnMvpbwlGedUmi7FFhqkdQVUEQ1OGnC8oLUILEiuWJkfBATiR0bqoNORv4do7JMmw2srY1RZIEYWP94Y2H6xuqEP6C4xiKArHWkETLCazRhi7rNyM/CeNbcjlJI7ORyzVFjgTuxqouI+irN7jQKSdZNhlcHFDumOqBFpy2unFjfajsAcv6VlhK5xA9agstB0zRHGXPRZewI8uZRCKRgq+MLO9QJLG5bLYdSLAq/LD7L5fXNwKNV4eqJ2Ckak8yztO4MZEtYGLS6C1oL8UR12pHPZY8tPL58XbPXdATigL5uQRfcEE/9rpzvp3kvHcEYW0z9ejxEZS2nRGWy4WxAKVIW9BevyTx+QLPM220yLVbPhtpjy6uwEZ+kWVZtg1fERMWj005oRytKsrqPHo7UhLypsdRC1+dLOkwVEhmJnXlXhFJ2+bGOCQBE3lS30qAl05n20wSL3Jsob8bia6Djh5BbnSXIxzDrqn45HlKSTxPKMXnT6DGyceCu5802kGexbp+sooVEmkkYmkckkAZeVL26A3PD47PtlUet4lLs33nnW9FVk3AkbquIw07uqxAgqDCPTlCWqevC97BeI4nmqxuZhIUMvKgfYuUZu3XIE0Ve4iuTU3GVOFk9+Uugxseoz/9rLkcjaFrmYQCRUMpkjNXlBT8CNXN3XGSTadbuLMQbsiJEDID+nxQC7xwYEjagTTMGgG7PLqN40DYOJahI6LcGDc24guYovzI2FPdkZWE8wxRgylKOFeLz5xVRd4hR+LSyWSa7CVCERS2GG0DIgAVE+XhiFEHwBiaJADmwnQ4EtZ1Iuby6smYJHGFeIqiEicgBbp0uXjkHEE7o6SePkmlnsD+LbPpCgnPcfg36nqUI0V+oMLOPSQkwOwakCbGtk52N4ijBYYrkwF9dv78NKm7OgyKMEuZzeGbcoE7UIihiCskufDKE5mY4dT9x6fFRPGDp1CesFXWT8I/FfYyEYqOij+ytRIwQ5uVsaKpP74i6zricDAQ+agtUOK6vXMbJXitM3d+cEfHkvRwiOPP5VuBExCjZoVsvq3m6DWIfgX7RsVL88+K952Ego0SdJJ2wycoXAhzlEp9cuWozBjGftjqIoOtbhRx5ycPvqJctp3L5dJZ1MpyY9jZjwUsRomfsD9RUCtXB3MEoIEdZoCgb8Vx+WRo3+vQHJ3irqz47JNHWOGghJxCRYqEGEK4V0tdepZIwYAfAFHrUiQB7FOvJoiDID+Iby26mARJFDeIoxRyJFTUoWT0O1+xdzLIULqH8S1FgFx/BxcCD7/mVHobyFHq2fxT3KkVn88/JwuX55+l+jgKy1Hx6rNUQsYMlLXgBKFPbQJ1PTN/ySUpvh1pNgDywIBWH5OMARAeEFOkv0B/iQ7waprPtXLpMCkjejHo7TB8NuQPqGtyIlUsugbmHhYoSABUlWjmzG2FJ0b3T1OJzAVilPlOYHN5aI6svdSpuyf9ZYxJ4tosGyYJdM/pZvqOScbvcLHXXUi3W2xuFDE0stksy4VcJqTHuMvH7yn3b8K/FtSWa7r3PeLo3in0ody0sahR2wGmPPfTjOJuGZujRIHS1rUV+N5cdp24c+vamk5dQRkdNN9GagZd4GySzU6Uf29HPnOQf6V4pFBHgB0W/NifElYSn3jbKUdXUkHXBzQr5AAYD303Ic6F4qAtunW7ee2QZW+vYJs0jREEJRBzaAVhrx504FC1x4pb/e0jn4XjjJJ4cr1I65HzJKFkjqPWFgYt8z5Hp04xMMhiLdx3gw3vovpeFllP/iAxWl5hLy6xt66PHQ2MAgmpyEEz8Bg8vU9I0sAfcmHE7hsKqXIfnrsnSXDp6D4UgH4lEY4pHouJzKrHNzDDcgRtl9vgkMKSLo8YbMLR3GFgts8L4YbrZ6Ngm2ulOUCBT7YHHEK4SXKLBHqfZJCNYJ+eQhR5tgj+S4UEwE8j8j9KeHYm9fgK5fJbfTt9oMuZjCyvUYcEvQr+y+VYpGvb17YvrrBNzFFf8ussENZwKlU/hu3CXaVt2RiWrYHsIEGCrnHGpygzIAQlVjt15TMFx7XKZ1eUkACIkuFlyMqPf6afEpIyR8eitwUoO/2H3nhwfPMhHTiJvVIZ74fkJLbmlpeub78/tzVmBmcMqMLuzsP1E0HFKR2x1zloYBx0aiISrNgfCXvyi4883JEHhOnCQ0hS8YNLKWX1k1UldekDZI1dbx5IZbu0UHOtTblT/vmnCrxYuny8+wvLHT+Cmib17xUPstArxJK7GZYjhLntrWX4Ni05SkMU3MxxNguvSa3UkyB6pVpN5Nv+deCwc+alaIU9/fMfeHgxiCNiPaASKavzSOFQn7bnUmTU9+tajeLIKDEbL19uMIJqqBbyjwEoW7VxOm7oXdp4O8+BvIhN0vXtKdkjpgXhkd1Gcmsz9S7Dd+uM3RP5dHKQHGVgZOlikK4xWJKIuTsieqR7SX9glcqSVKU4wjkPfK1AucTbhmlqFSlC0YACJdGrEshiipausT5Hk1AxEJwbIyOwmCOpdrdUuluVIEfcQI58mw0pGGSz8YYbFzBLCmbowoa3IbC6EqA4Wigbd4NfiUzNsKtMNK8BvaVyLEmNElmNDVIT9WnLr5bnpmaOKPAs0rVqo1Su2uVSoxrStTDU3XUXq5nMzjoMC/gI/C2F3b1VLG6re7uBHREhR1av7uuSxRiL9AFEIPaz0XXqceMgYqPuHQ4LEu72l7e2p+MehUFs9kHJxCgtQpuddPW5r2GqC4HZ1JG9Z5JhUGlwaGNPdnd3T2hLKzJW3arYFZ8jAMIcxUCs1kVJ68R8UbI90857VpugMPVCHT7dghxVnINFiAMHnYCrz6Ix8GAqQ4Z62AjC8hcZTlQbHafRsANdgxv8fHFE88SGJaISnL7rBcx929tPmKLXUS0A9ypKPkQuR+Id0R6aGT7pa1wfR2FAY7T2r1COqh1Pc9ST1aMvNoY3DsqRFCtH8BIukGsIO/808AduJonJx0Y0+HDHH4Fd8S+ewHHx9hk5bz5GcCTa9bVf1qE98tNDwrF8+vjC0AIIiFKpvm/FGe1Gl6zNJiEvXDbdzrXTIxJeZwafawXk85w70Cw2qpJ7QHVP1+MTgKjPveViaQRHDF/61a9MQJllFLYcDcmDYgBg2XHjstBmu0tuxQIauJs+Qx4xUFgLxBXg+HbSFStg3K218eFxCByb3EIcNX2M4ggwZrgThzuW9Z2RAzPx/pEU2OzXBy7vZ6uhurXS+Wy20GZbbWj1SNP4f37JomwtzsnJsecCabl+zYUziqP+jlJYe7A2StUG7svsjOWPnwfZJJv2P3DQt4an2MrlOY5JEw8cVBd5aAoLKErNZOKSW5PZ7DioZ6jqdf1yKOi9iX87GbhWJKGP6stISoisFm0H2myukEVDlpub8df7vBydBRvI7UIL583HjoER5yM2ar6+q8KA693CQzYtD98GRyry30cbMRoFfszCqUkBjIPeyEooDiUGssMzk1OGuplKUcaRd488xCvKsm126iRxKPSCJ7xgcOFwjPO+9KMzvt0iFTpkNUe2iYZxoR3QX9Ok0isH7oDnypeuXr36a0D4gb1MLgkFOAldo+ygSwR7pEGZ1TMj70Zfv6kko4BSG3zAUV3BbUawOs8X+n4XfIl+Qn2mzqTtr8xy7f5fevjz08uXL/9WRJ5LuhUyhq12tAqWIMumzyRHlD5zrQjLpIyGXb7djJpk6CyoVJuCn/FUa1Uu3fe7YAde3s4LHXwd8cvAoPJGgtQw7hSLRahrsUdJxg58hQc1xqYo6Mn7ax9djrZWYk6Ro06F/h111hw/hKNChCOqYnVsjjLYWUvGf0undZBHL5618xNu6l4VJ8P1ZTZdjprXt2I48r51P7n7oE67wEzEkT9eOL4cYY5ag75u+QyVq6VOp2T3p3jGg5zxxkRRaiTypc/CVp+yIVaCT/4140PCNRFHfrZnIo7Wh21ARFO0FhqaYWj1jnkmUVJ3ghhV6ENh8OEhRxzVPH+HwSrI22QceTsZl6P3MnJG/rfB37tDFKK1r0louFCyFswzSRJkwlu8eaEPL168GHB4JEeFSGuY0KrCcDmK2mwIt8cYk6MXeuKjO/pXg4/g5jDK+14KRrIr56t4VzdgLNYPrxHJXBi4p6dOz01yUbUtXJij6A7y/Ry5gjQeRx/pH0Ge7lBrkul8Hle8uB/J3kS7LiHHBDVQdM53W4CKyg1SKVQsnPKRSHgcFWJG+KkTcG8R4IMW5yIc5ft30McR6f9DHKXbLoKtWujj7/QXkCbEk4c29rDhnrNt8pGcl9S1ALp2SPDF6vnKIxFHyhWIxNEVH4lExr1ScYN5HKVZZE2Wve2tQIKGOLromvsY363fsclHOQqKL2gyOE59qH/1uZ6QP2epbT3wWTYoTZQOTEDkO88Aq35+jh45jpN49pnj4vqqktB/MpAjWtng96qqptk5bwUeNkmzZEh5XI5wz0r1Bdm4QyEJFfZ09kUmoVMctYMIhMsH6X6p4nLUZqbCESrOKyrozYXiX6nYMQbqbJK8ur6z/vv33n+P4PfrOzs763947/NP/x19RLo2Bkf48o/DkXpTx10/xRG0R1kvqUNBbNgi3GUSZTfE3vlujVc36Jo2vx5G/4F7lfIFGqTxIWUTNnVZT8xn3BFut+xG/+QUDXfDsw/9vjCAI5aZjKOPIj9v5dJ5PhT6A8tBvOB67XLnbJ0/zVHq3ryLy8VL6M+qMqBz9VQvWJNH5bHK0XyCLu5LJIrzqAQ00beDwgCO2twkHMXsmCUhbSBOYslNfwGp3jhf4hvbo6gcBf1aPEfU6bRJCfHVRBipq0fKGBwFAUV2Eo4GNY9tBeXkoLzYg8GaKJbrpXMx5Oqa4oMsj+QoULYW4SiViJKkJMbgKEhuJLnxOMqs4koU2kEKw0+PgHJ9v2HbjYXeWQO2EEf9GKFrVNOFzaDcJigDJB9TIzkKyC6MyREp2qE9pOghfJJEs9rrxY7NTYpNOepkw3NUvCMub9HBv8cRdT7pP/7p8/e8Xm2H4A/40+d/+o+RHHGBto3JkXcRB5NE3fSNdG0ad96qfaBj2sNbc1Tw78tRsEmytuwv590duCQsXRzNUTZYDnzqeI7g+Uo3g0LtO4OyI315jNeBgIClv7Hs+3EcUf4vxRGHSmbh/wk4on2t4Rz9tQ7x46A4Xt/Nhm+B8OH5ra9zgi4vx7Yy55RUftGIGfagYrYVxNFSk11iv7QYUxMtk/+62VxyOcry0XAtzFH/EN0AjpY/tCB++7wYcAQ9omw6R8TpEMLb1I20y5qmvbaJADBHS7fntrabHwM+pvQn1LNhjl4tNZ3m1yWm1pDqNuMcHjpNl6OY34Y4ivOW4jg6+E8RysXPHq/67gmuZka859M59uJ155q3KUltAm2/1ImtN5kC4PlDEXp1Cx5texBHVONXfF0TJUbC/yldG8kRrbZDODqsEJv91L1HK5HRf+dXfEND9eGfWZ8jFplqUdJKUsNCS9MgBYQgMl9fnNsiIelgjgJlwxwtHzaX/2JWGcuWbE39TbO5Mj5H/WnPGI5WlglHly4XXZP9lZsqBkaj0eg52pfX2CW3EIqUmte7Ut2CX06jcgJoVgDNqN7FIjSCo8CwY462DptbhtZQ7ZrUs/i/bm9vjccRzv30dVAxHL06JBwdzZNaXRzV4mQRMBZt2yppfzmAnTABuWWhhjgq2zXn3BwBIJVKXR+LnYYZXNjtj5lBHFFX2F2Ae4rRtZg7uSMcMUH/P5ij97cJRwkUGeov3JC7VWA4YFSgYtW/afq6lgOertUtUTLPzREwNNMxJZFAMjqMCGiO8vnFb/I0/DP1lM2To4tQjhgsRwyUo4suR+l8FP0ccdHMbAxHTiBHGf09attc+pvr2WzhryvLPkfE0wZaxSpZAJyfI9E+6B5oWTczCsyORPtH29fD/hFLVc94WxF7tM1Wy6ZN7BED7dEyG+sfIQ+vj6O+/j/OHq349igaqzXRTWswHvCHTMlOgQltkjYdjmpSScuShPwYHFFOLM0R/ELydE0c4kOiFHjEZjP92ZIYjppzX0Nhl/74+ErKTZGGGknDc3QBDkSmwlEPcgTc+pRJOPJ6Ntc/+vJjwyqptbrUtXnoH11vTsBR1GzH+UeHd0u1WvfTq7Bbi5DUDHPUilhAbVocuZ8m4cjrszFHh82sVTY05GdrJkP52WNyFO7/4+M1q+dYN3HPHyZpe+7a+wEW+/AGOfLaT3StxQE3WAOAH1/XvGvOhyocBsS0Zle6GZcaadIwoiifOx45B0dud0Q4atNe6KT2iIn0/1mU0CABaYijksdRQl+lRCmI1GAzIh4xEO34m5Ym4qg2EUcspe1ku5WtJQiLxtdLGCt/G8VRu8+6YXxjmxKw8MlRHGnVkvVTL3+U0e/8l2fEVrwerQ04XEhKv6RzJvwxR13LiXDkl/MB4zr2s6nqvnApLlwj2vUPIeohfEhQE/tK9Ri6XJDeGefXEAKt0+hUu6U6uaXY21Zs1Ou/eLbqQ95FUX+yRThq3VrOA7sqUi+AXoy0eG6OgNboVTTRE0yjQ89RBcwK4ogZOm8lEAdjxLHF2AyP2KtCX7YuSk747HBSkaYbE8sxYq0qMpxtg4Af2+NInAZHsKFSqepriX0A3S7/1FyOACNWtb6cZzDTqjDi1qFBRzbgAWMMqlhtSDCKkMr7A6Kg6PaII3wV3ZcoSWTiGvR5Ghyh69Y4qDeQiizW6xX7wLHLLiEBR7X9eih3rgon6w/2HuycCKrAHeNMjkrq71XVq8MfBWDV605NosSO3Furlr+omXVbKzXEsXYV5Uisd7t1yfs8HY4g71C6URM7PNI1rb7Q0LCeBBz1qtWFajAGI5ygO2vR4MCFjXU8r6G6u7q5ubknCHvwz+ruoDMLzV4KRdisVCmYAN06ubv78oP/rnzxP78ky6ObjzhCM7SKaJZWGA05tl2RyDK0R3enwhE0So6ErmKnjGw2EMtVIkwUR7ZkLPo9hLAme7l3xBOqP8X3lEC2hGM5k4lOUeODZ/ORWQSderXmYaGsrpNBp2Lx8tVikQxBjWw95kisVmE3XxXhS3IsrSJhe1QT8+kVYzpjAPxivVsqQ44M3K9BY4qEyZSMgCOt0vUoUl/qCaWI5+VJQZbw7dl4dogM4ijTP42PiyzKxrdydKwg9np+zkErSf48dpAjN984LkfIBiHhh3sq3b2LrrkfByancmuk2OhpGsMc1Osdb7IGyYDCVHM8e7RYsXyrfSInlNPn9xQlUXzmJZbH4QhPdxsuMwemf+86qu7wJ4uZlCO11mjUgGuDgCRhjz/IuUzjRm1oPtF+F20rSJLDjkGrB/YomEhO2JOVxOP7j+6nUqdoch483QrSNTQJpnBBzgzkKJ3luXY6tArcNV3HQ0TG9cSdpM3nKDN0Kj8MxBFwqlVH0jQAqBeVTTg7NQHKnWoN6Vq4h4fCVDZIHpLu1KCmnX5SvPq0qDiXiq4gqbvHNzMZaLNv3NwccK8bo7YKhWwhfFOBWGuQm+ZNa1ENJmnzOYrO4hYDwpFpOlKtIcJOWgTwBfcLKM99GpNrSN16D3EU7QKkxn4n4qWgGdeU089SkKP7j3AYLt8Q8N16OlpQhb2iLoLYQWQOTRsUtg2SdeBUKhWnVHKgUww5IhWZyGbjhbE5uttxRCAyrk1CLzoEHDDxxUQQ7YYEYjhi+HL0/nU0K6ByNH907wl8QzVvntXe0OEJQd/27/fuuT356OMCu9JAN8yXGw0DWULj3iWCR8/dhV+P3Au22eVyX0PpfEs0qXQWAGMf+UfjhMj4qQTF5/OfnD66dOmzDxKKOx0flC+odLC/vX//77grH6PgF2gVrVs1NbNUszu4GU8+IHh12V3433E4gh6jKEYCfpBFWZPt5iG7PaUZ2gCU9tJYzj++AxnNSnfv6enj06f3Up4cPZQz8I8kFYsPyGQKoRbHnx4U3+oBPHLHkNADIqCuuSWZyD/CGH3HIzQ9WixYdnkOY0oTIgF4MU1z9Hb+XLyoT3v2qHjvuTfXHOzRoDwB7R9XrvwjpsGxU04AY7HUMaFvVF2s4NrXM9nsaikWHx+yhw7bZJdeTWuWlsEXO4oT7MOknHtFlyNy6z8nozumgPPo0aOYBjvx1gmULRwHiibRzLNwxFATgYSQZZuoJvrW1lRM9kQQUDIwBfu01BWsa2Q6OhRGoFuZpM3iXlyDB/HvXhj3zzgclbMBhjaUz7GoeGprefqT/YyCigQpde80hQpynyQUIkbq+gM851p5b2+jHIPx9j2aI2D+00/Nbo+oC1HZ24doGHzqd9OOhoAiBhKuwb7fu8uLTGcAFr74dH8hjE8/7SwsaIC614nKhkR2vUmKKouXn7mVlVB/0WZB0k48nHPLD5fnlobfJsu1UbJ9rvkmnoDnT+OO8soDZmsOwGVkJGnqjYx376Vhe4h2pOrLNYIf/sNd2ICBUN0q10ktCCKJZS+iSdeat181R9xKLNYrlYODg8638DSSfqD51lCpqaxv7kYo6rdEO8Uiskeqgv1xBs/uVOnhgph9DUTSaF5NJvAWUDBpm7xN8qToZJEZnru1NIcy/cM5AkajB3vr+D71tUMVNnb2bt58uBudPwIsVqK4/hl862i7uhfGAdNxLEmULMfRwMba2sCMnLdPEsuLKP8B9Q5bIud9bJVGyhEKdPank2WbHIOeHGZG8fPT0/+Df8oP5Iy7NTBLxr4t2ftGVxMe6CMek0UAY1UTSgVEjR6JGnHbvmog1+yte45iX5+/Jsu7UBKETfk44EgyDhoHhlSCHMny3hgcwTjQNKrYhk3AkWjD8KFy/pOaLkAjjCoMgckt4LJnjhBH0LNeqEqEo8w4HAWdG6AnjRjl+IBp1UNOE8AOw0LzaXNeVsDdBsqR3dEWbTRCLFAuwXgYNTv124/IKCTUsQyacU19KfvTzAOza+0bktGxum+kV34bEJo8TkA+lM6hSFh2fSlgLh7gJ4RVFr+nHPHZHCrm9KeQwJ4m5sibjB76RweLnU5n8WB/XI6+9YDrtYJ3n7DlzbPBEY4EiiMoQW4QN3gi0xC4QutdNT3xYNlDPBu6W38Vy9HwzFsUBSiYuejzJ95hoGG/uSX29i1/+gccmnLCDppufWRsF4/kaE/oXQKXZLev4byWl7S5gcCou+jPgEcqj+jHUbXkVBLSbwnQbA/O8qGz5HM0sJ4EFdOSGomcPw1ZLPh2OvzgqXccfJvdQml2Z3vk2GjAEYseL8AOeSIu/7qm6n0zyN7Cc48sHYxM/lEcoRkMp/kg6rccYg1Xii79c4ykjZePxtNEfI84Ypje3O2/3f14kpxNIEfu0yDBeW/Jf9shljXLnOh238AemYzBQwfTYMYa6nuHMbZz6MGfYotfYLpm1dbq5YXX1LZ3FoF/pJKXCiafMvr7At59ygIwZnI0EG5nyPU9rGYGD2oX/2HTxjkfC/pdhoXfWbb19XfKsZ4qqvgdjVPnwIyleNSQ84hGGVfQjHzfoVh/ijAZs2wY7DZ5ClZ69A++h7jL1KEPebiFJw/Jjd7++wj8sENSWJ2Mn3h+BgJULDz9h6h9t4AGDGZCNBy571ba8bVgxtAMM8wwwwwzzDDDDDPMMMMMM8www7eG/we4JqqBiwMk+QAAAABJRU5ErkJggg==)', backgroundSize: 'cover', backgroundPosition: 'center top'}}/>
                 </div>
                  <div className="card-body">
                    <h4 className="card-title">{event.type}  : {event.title}</h4>
                    <p className="card-text">{event.description} </p>
                    </div>
                  </div>
  <Link to={`/detailevent/${event._id}`}> <Button className="btn bg-gradient-primary"> Participe</Button></Link>
                </div>
                </div>
           ) )}
              </div>
            </div>
       
<Footer/>


        </>
    )
}

