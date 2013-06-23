var speed:int = 5;

function OnControllerColliderHit (hit : ControllerColliderHit){

	if (hit.GameObject.tag == "Physics") {
	hit.rigidbody.AddForce(transform.forward);
	
	  }
}