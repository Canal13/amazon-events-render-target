## Amazon Events "Render Targets Definition" Javascript Action for GitHub Actions ##

Inserts a task definition ARN into an Amazon Events targets definition JSON file, creating a new targets definition file.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)

<!-- tocstop -->

## Usage

To insert the task definition ARN `arn:aws:ecs:us-east-2:ACCOUNT-ID:task-definition/task-name:version` in the targets  definition file:

```yaml
    - name: Render Amazon Events targets definition
      id: render-targets-definition
      uses: canal13/amazon-events-render-targets-definition@v1
      with:
        targets-definition: targets-definition.json
        task-definition-arn: arn:aws:ecs:us-east-2:ACCOUNT-ID:task-definition/task-name:version
```

See [action.yml](action.yml) for the full documentation for this action's inputs and outputs.

