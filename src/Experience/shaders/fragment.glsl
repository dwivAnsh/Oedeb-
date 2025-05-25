varying vec2 vUv;
varying float vElevation;

uniform float uColorChange;
void main()
{
    // vec4 c1 = vec4(1.,.5569,0.702,1.);
    // vec4 c2 = vec4(1.,.6706,0.7804,1.);

    vec4 c1 = vec4(1.,.7255,0.8157,1.);
    vec4 c2 = vec4(1.,.8235,0.8824,1.);

    vec4 c3 = vec4(1.0, 0.949, 0.8, 1.0);
    vec4 c4 = vec4(1.0, 0.9765, 0.902, 1.0);

    float blend = smoothstep(-0.14, 0.14, vElevation); // softer spread
    vec4 colorpink = mix(c1, c2, blend);
    vec4 coloryellow = mix(c3, c4, blend);

    vec4 color = mix(colorpink, coloryellow, uColorChange);
    gl_FragColor = color;  // slight opacity
}
