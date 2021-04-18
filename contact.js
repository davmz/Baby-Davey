/**
 * Name: David Montanez
 * Program: Business Information Technology
 * Course: WEBD-1008 Web Development 1
 * Created: April 13, 2021
 * Updated: April 16, 2021
 */



/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return True if no validation errors; False if the form has validation errors
 */
function validate(e)
{
    hideAllErrors();

    if(formHasErrors())
    {
        e.preventDefault();

        return false;
    }
    
    return true;
}

function resetForm(e)
{
	if ( confirm('Clear survey?') )
	{``
		// Ensure all error fields are hidden
		hideAllErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("name").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

    e.preventDefault();

    return false;
}

/*
 * Displays the error for an invalid form field.
 *
 * param formField A reference to the form field that caused a validation error.
 * param errorId   The id of the error element to display.
 * param errorFlag True (an error has already occured), False (no errors have occured thus far)
 */
function showError(formField, errorId, errorFlag){
	// Set the display style of the error element to diplay
	document.getElementById(errorId).style.display = "block";
	
	// Determine if this is the first error
	// If so, set focus to the text field
	if ( !errorFlag )
	{
		// Set focus to the text field that caused the error
		formField.focus();
		
		if ( formField.type == "text" )
		{
			// Select the text in the text field
			formField.select();
		}		
	}
}

/*
 * Does all of the error checking for the form.
 * 
 * return True if an error was found; False if no errors were found
 */
function formHasErrors()
{
    let errorFlag = false;

    // Required Fields --> no inputs
    let requiredFields = ["name", "number", "email", "message"];

    for(let i = 0; i < requiredFields.length; i++)
    {   
        let textField = document.getElementById(requiredFields[i]);

        if(textField.value == "" || textField.value == null)
        {
            document.getElementById(requiredFields[i] + "Required").style.display = "block";

            if(!errorFlag)
            {
                document.getElementById(requiredFields[i]).focus();
                document.getElementById(requiredFields[i]).select();
            }

            errorFlag = true;
        }
    }

    // Invalid phone number format
    let numberRegex = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/);
    let numberInput = document.getElementById("number").value;

	if(!numberRegex.test(numberInput) && numberInput != "")
	{
		document.getElementById("numberError").style.display = "block";

		if(!errorFlag)
		{
            document.getElementById(requiredFields[i]).focus();
            document.getElementById(requiredFields[i]).select();
		}

		errorFlag = true;
	}

    // Invalid email address
	let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let emailInput = document.getElementById("email").value;
    
    if(!emailRegex.test(emailInput) && emailInput != "")
	{
		document.getElementById("emailError").style.display = "block";

		if(!errorFlag)
		{
            document.getElementById(requiredFields[i]).focus();
            document.getElementById(requiredFields[i]).select();
		}

		errorFlag = true;
	}


    return errorFlag;
}

// Hides all of the error messages on the page.
function hideAllErrors()
{
    let errorFields = document.getElementsByClassName("error");

    for(let i = 0; i < errorFields.length; i++)
    {
        errorFields[i].style.display = "none";
    }
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement)
{
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		return false;
	}
	
	return true;
}

// Handles the Load event of the document.
function load()
{
    document.getElementById("contactForm").addEventListener("submit", validate);
	document.getElementById("contactForm").reset();
    document.getElementById("contactForm").addEventListener("reset", resetForm);
}


document.addEventListener("DOMContentLoaded", load);