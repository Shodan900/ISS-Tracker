class Satellite {
  constructor(data) {

    if (data == null) {
      return "Invalid data. Type null.";
    }

    this.jsonData = data;
    this.lat = data["positions"][0]["satlatitude"];
    this.lon = data["positions"][0]["satlongitude"];
    this.alt = data["positions"][0]["sataltitude"];
    this.name = data["info"]["satname"];

    // greek letters used in lat long equations
    this.phi;
    this.theta;

    //position
    this.pos = {};

    //calculating lat, long to x, y.
    this.phi   = (90-this.lat)*(Math.PI/180),
    this.theta = (this.lon+180)*(Math.PI/180),
    this.pos.x = -((3) * Math.sin(this.phi)*Math.cos(this.theta)),
    this.pos.z = ((3) * Math.sin(this.phi)*Math.sin(this.theta)),
    this.pos.y = ((3) * Math.cos(this.phi));
  }
}