const fs = require('fs');
const path = require('path');

const projectDir = './app'; // Adjust this path to your project directory

function generateSpecFile(componentPath) {
    const specPath = componentPath.replace('.component.ts', '.component.spec.ts');
    const baseName = path.basename(componentPath, '.component.ts');
    const componentName = baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Component';

    const specContent = `
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from './${baseName}.component';

describe('${componentName.charAt(0).toUpperCase() + componentName.slice(1)}', () => {
  let component: ${componentName.charAt(0).toUpperCase() + componentName.slice(1)};
  let fixture: ComponentFixture<${componentName.charAt(0).toUpperCase() + componentName.slice(1)}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(${componentName.charAt(0).toUpperCase() + componentName.slice(1)});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;

    fs.writeFileSync(specPath, specContent.trim());
    console.log(`Spec file created: ${specPath}`);
}

function traverseDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDirectory(fullPath);
        } else if (fullPath.endsWith('.component.ts') && !fs.existsSync(fullPath.replace('.component.ts', '.component.spec.ts'))) {
            generateSpecFile(fullPath);
        }
    });
}

traverseDirectory(projectDir);