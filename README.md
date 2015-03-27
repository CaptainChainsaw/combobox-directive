# combobox-directive
combo-box-directiive

This directive creates an unordered list which displays dynamically generated list elements.  These list elements can be selected or deselected by clicking 
"Select All" / "Deselect All"

Invoke the directive like so:

  `<combo-box url="/directives/php/getships.php" list-name="Select Ships" loading-message="loading ships ..." ></combo-box>`
  
  url: this is the url that returns the data.
  list-name: this is the name that appears at the top of the unordered list / dropdown menu (if its styled)
  loading-message: this is the message that appears underneath the list to show that data is being loaded


An unstyled demo can be seen <a target="_blank" href="http://hoteldemo.t15.org/directives/">here</a>
