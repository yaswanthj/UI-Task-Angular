import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {

  data = {
    "status": 200,
    "entity": {
      "nodeStandardMetadata": {
        "nodeId": "1584420547524",
        "nodeName": "Green Koncepts Pte Ltd",
        "children": [{
          "nodeId": "1584420558984",
          "nodeName": "Level 3",
          "children": [{
            "nodeId": "1584420568914",
            "nodeName": "#03-15",
            "children": [{
                "nodeId": "1584420577974",
                "nodeName": "Energy",
                children: []
              },
              {
                "nodeId": "1584420590985",
                "nodeName": "Temperature & Humidity sdsd",
                "children": [{
                  "nodeId": "1584420590085",
                  "nodeName": "Temperature & Humiditysds",
                  "children": []
                }, {
                  "nodeId": "1584420599985",
                  "nodeName": "Temperature & Humiditysds sds",
                  "children": []
                }]
              }
            ]
          }]
        }]
      }
    }
  }


  list = this.data.entity.nodeStandardMetadata.children;



  constructor(private router: Router) {}

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  
  logout(){
    console.log('logout');
  }

}
