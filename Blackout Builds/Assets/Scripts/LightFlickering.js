    #pragma strict
     
    var minWorkingTime : float = 60.0;
    var maxWorkingTime : float = 120.0;
     
    var minLightIntensity : float = 0.5;
    var maxLightIntensity : float = 2.5;
     
    private var startIntensity : float = 1.85;
     
    enum flashlightState { IsWorking, Flickering, Resetting }
     
    var currentState : flashlightState;
     
    private var workingTimer : float = 0.0;
    private var workingTimeLimit : float = 90.0;
     
    var minFlickerSpeed : float = 0.05;
    var maxFlickerSpeed : float = 0.2;
     
    private var flickerCounter : float = 0.0;
     
    private var resetTimer : float = 0.0;
     
    function Start()
    {
    workingTimeLimit = Random.Range( minWorkingTime, maxWorkingTime );
     
    light.enabled = true;
    startIntensity = light.intensity;
     
    currentState = flashlightState.IsWorking;
    }
     
    function Update()
    {
    switch( currentState )
    {
    case flashlightState.IsWorking :
    IsWorking();
    break;
     
    case flashlightState.Flickering :
    FlickerFlashlight();
    CheckForInput();
    break;
     
    case flashlightState.Resetting :
    Resetting();
    break;
    }
    }
     
    function IsWorking()
    {
    workingTimer += Time.deltaTime;
     
    if ( workingTimer > workingTimeLimit )
    {
    flickerCounter = Time.time + Random.Range( minFlickerSpeed, maxFlickerSpeed );
     
    currentState = flashlightState.Flickering;
    }
    }
     
    function FlickerFlashlight()
    {
    if ( flickerCounter < Time.time )
    {
    if (light.enabled)
    {
    light.enabled = false;
    }
    else
    {
    light.enabled = true;
     
    light.intensity = Random.Range(minLightIntensity, maxLightIntensity);
    }
     
    flickerCounter = Time.time + Random.Range( minFlickerSpeed, maxFlickerSpeed );
    }
    }
     
    function CheckForInput()
    {
    if (Input.GetKeyDown(KeyCode.F))
    {
    currentState = flashlightState.Resetting;
    }
    }
     
    function Resetting()
    {
    resetTimer += Time.deltaTime;
     
    if ( resetTimer > 0.75 )
    {
    resetTimer = 0.0;
    workingTimer = 0.0;
    workingTimeLimit = Random.Range( minWorkingTime, maxWorkingTime );
    light.enabled = true;
    light.intensity = startIntensity;
    currentState = flashlightState.IsWorking;
    }
    else if ( resetTimer > 0.65 )
    {
    light.enabled = false;
    }
    else if ( resetTimer > 0.55 )
    {
    light.enabled = true;
    light.intensity = startIntensity;
    }
    else if ( resetTimer > 0.25 )
    {
    light.enabled = false;
    }
    else if ( resetTimer > 0.15 )
    {
    light.enabled = true;
    light.intensity = startIntensity;
    }
    else if ( resetTimer > 0.05 )
    {
    light.enabled = false;
    }
    }