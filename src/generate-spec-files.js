const fs = require('fs');
const path = require('path');

const projectDir = './app'; // Adjust this path to your project directory

function generateSpecFile(componentPath) {
  const specPath = componentPath.replace('.component.ts', '.component.spec.ts');
  const baseName = path.basename(componentPath, '.component.ts');
  const componentName = baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Component';

  const specContent = `
      import { ${componentName} } from './${baseName}.component';
      import { ComponentFixture, TestBed } from "@angular/core/testing";
      import { MockService } from "ng-mocks";

      describe('${componentName}', () => {
        let fixture: ComponentFixture<${componentName}>;

        beforeEach(() => {
          fixture = TestBed.createComponent(${componentName});
          fixture.autoDetectChanges();

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