import { Resolver, ResolveField } from '@nestjs/graphql';

@Resolver('Response')
export class ResponseResolver {
    @ResolveField()
    __resolveType(value: any, _: any, info: any) {
        if (value.error) {
            return 'ErrorResponse';
        }

        if (value.message) {
            return 'SuccessResponse';
        }

        switch (info.path.key) {
            case 'case':
                return 'Case';
            case 'cases':
                return 'Cases';
            case 'contact':
                return 'Contact';
            case 'login':
                return 'Login';
            case 'tokenRefresh':
                return 'Login';
            case 'test':
                return 'Case';
            case 'testSlots':
                return 'TestSlots';
            case 'invites':
                return 'Invites'
            case 'caseGraph':
                return 'CaseGraph'
            case 'ageGraph':
                return 'AgeGraph'
            case 'genderGraph':
                return 'GenderGraph'
            case 'bcgGraph':
                return 'BcgGraph'
            case 'maritalGraph':
                return 'MaritalGraph'
            case 'transportGraph':
                return 'TransportGraph'
        }

        return null;
    }
}
