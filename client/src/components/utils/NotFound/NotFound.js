import React from 'react'
import "./Notfound.css"
function NotFound() {
    return (
        <div class="container error-container">
	<div class="row  d-flex align-items-center justify-content-center">
		<div class="col-md-12 text-center">
			<h1 class="big-text">Oops!</h1>
			<h2 class="small-text">404 - PAGE NOT FOUND</h2>

		</div>
		<div class="col-md-6  text-center">
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>


			
			
			<a href="# " class="button button-dark-blue iq-mt-15 text-center">GOTO HOME PAGE</a>

		</div>

	</div>


</div>
    )
}

export default NotFound
