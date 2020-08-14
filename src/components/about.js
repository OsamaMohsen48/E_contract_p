import React, { Component } from 'react';
import chain from './images/chain.png';
import value from './images/value-design.png';
import smart from './images/smart-contract.jpg';
import value2 from './images/value-design2.png';
class About extends Component
{
    render()
    {
        return(
            <div>
            <div id="carouselExampleSlidesOnly" className="carousel slide " data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={chain} className="d-block w-100 " alt="..."/>
                    </div>
                </div>
            </div>

<div className="offer-section col-xl my-5" >
<div className="container my-5 ">
    <div className="row ">
        <div className="inner-offer col-md-12">
        <div className="col-md-6 offer-left float-left">
            <div className="offer-image">
                <img src={value} className="w-100"/><br /><br />
               
    

            </div>
        </div>
        <div className="col-md-6 offer-right float-left">
            <h2 className="blue-title">Our Offering</h2>
            <p>
                We offer a simple user experience for securely recording and tracking property with our Blockchain-as-a-Service (BaaS) blockchain platform, ecosystem, and API called <a href="products.html">unanimity</a>.
            </p>	
            <p>We help title companies, municipalities, and custom clients benefit from a clean record of ownership, thereby reducing future title search time, and increasing confidence/transparency. </p>
            <p>We've created a fully functioning, easy to use enterprise ready platform an API for inputting property information, including uploading and record documents onto the blockchain in an agnostic manner.</p>
        </div>
        </div>

    </div>
</div>
</div>
<div className="container mb-3">
	<div className="row">
		<div className="col-md-12">
			
		<div className=" active text-center">
        <img src={smart} class="d-block w-100 " alt="..."/>
    </div>
 
		</div>
	</div>
</div>
<div className="value-section col-xl my-5" >
    <div className="container ">
		<div className="row ">
			<div className="inner-value col-md-12">
			    <div className="col-md-6 value-left float-left">
                        <h2 className="blue-title">Vision & Values</h2>
                        

                        <h2>Vision</h2>
                        <p>
                            Building and maintaining an innovative Blockchain-as-a-Service (BaaS) 
                            unanimity platform and API that serves both the real estate industry and 
                            governments through the power of our people and the blockchain
                        </p>
                        <br />
                        <h2>Values</h2>
                        <p>At Ubitquity LLC, our employees share a set of values that shape
                            how we do business every day. Our core values set common direction on how to make
                            decisions with a sense of pride and leadership. 
                        </p>	
                        <p>We recognize that it is not only what we achieve, but how we achieve 
                            it that makes us proud of all our accomplishments. <h2>Here are our core values...</h2>
                            </p>
			    </div>
			<div class="col-md-6 value-right float-left">
				<div class="value-image">
					<img src={value2} className="w-100"/>
				</div>
			</div>
			</div>
            </div>
			</div>
            </div>
</div>
        );
    }
}
export default About;