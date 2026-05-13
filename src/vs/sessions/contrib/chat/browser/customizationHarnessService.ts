/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from '../../../../base/common/lifecycle.js';
<<<<<<< HEAD
=======
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
>>>>>>> 0958016b2af9f09bb4257e0df4a95e2f90590f9f
import { CustomizationHarnessServiceBase, createVSCodeHarnessDescriptor, IHarnessDescriptor } from '../../../../workbench/contrib/chat/common/customizationHarnessService.js';
import { IPromptsService, PromptsStorage } from '../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js';
import { BUILTIN_STORAGE } from '../common/builtinPromptsStorage.js';
import { SessionType } from '../../../../workbench/contrib/chat/common/chatSessionsService.js';
<<<<<<< HEAD
import { ISessionsManagementService } from '../../../services/sessions/common/sessionsManagement.js';

/**
 * The session type that supports local harness customization.
 * Hardcoded for now — ideally providers would declare harness support explicitly.
 */
const LOCAL_HARNESS_SESSION_TYPE = 'local';
=======
import { LOCAL_SESSION_ENABLED_SETTING } from '../../copilotChatSessions/browser/copilotChatSessionsProvider.js';
>>>>>>> 0958016b2af9f09bb4257e0df4a95e2f90590f9f

/**
 * Sessions-window override of the customization harness service.
 *
<<<<<<< HEAD
 * The Local harness is registered when a provider offers a session type
 * matching {@link LOCAL_HARNESS_SESSION_TYPE}. When providers are added or
 * removed (or their session types change), the harness is dynamically
 * added or removed so that the Customizations editor reflects the
=======
 * The Local harness is registered when the `sessions.chat.localAgent.enabled`
 * setting is true (the default). When the setting is toggled, the harness is
 * dynamically added or removed so that the Customizations editor reflects the
>>>>>>> 0958016b2af9f09bb4257e0df4a95e2f90590f9f
 * current state.
 *
 * The Copilot CLI extension provides its harness (with `itemProvider`) via
 * `registerChatSessionCustomizationProvider()`, and AHP remote servers
 * register directly via `registerExternalHarness()`.
 */
export class SessionsCustomizationHarnessService extends CustomizationHarnessServiceBase {

	private _localHarnessRegistration: IDisposable | undefined;

	constructor(
		@IPromptsService promptsService: IPromptsService,
<<<<<<< HEAD
		@ISessionsManagementService private readonly sessionsManagementService: ISessionsManagementService,
=======
		@IConfigurationService configurationService: IConfigurationService,
>>>>>>> 0958016b2af9f09bb4257e0df4a95e2f90590f9f
	) {
		const localExtras = [PromptsStorage.extension, BUILTIN_STORAGE];
		const localHarness = createVSCodeHarnessDescriptor(localExtras);

		super(
			[],
			SessionType.Local,
			promptsService,
		);

<<<<<<< HEAD
		const sync = () => this._syncLocalHarness(localHarness, this._hasLocalSessionType());

		this.sessionsManagementService.onDidChangeSessionTypes(sync);

		// Initial sync
		sync();
	}

	private _hasLocalSessionType(): boolean {
		return this.sessionsManagementService.getAllSessionTypes().some(
			t => t.id === LOCAL_HARNESS_SESSION_TYPE
		);
=======
		// Register the local harness dynamically so it can be toggled
		// when the `sessions.chat.localAgent.enabled` setting changes.
		if (configurationService.getValue<boolean>(LOCAL_SESSION_ENABLED_SETTING) !== false) {
			this._localHarnessRegistration = this.registerExternalHarness(localHarness);
		}

		configurationService.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration(LOCAL_SESSION_ENABLED_SETTING)) {
				this._syncLocalHarness(localHarness, configurationService.getValue<boolean>(LOCAL_SESSION_ENABLED_SETTING) !== false);
			}
		});
>>>>>>> 0958016b2af9f09bb4257e0df4a95e2f90590f9f
	}

	private _syncLocalHarness(descriptor: IHarnessDescriptor, enabled: boolean): void {
		if (enabled && !this._localHarnessRegistration) {
			this._localHarnessRegistration = this.registerExternalHarness(descriptor);
		} else if (!enabled && this._localHarnessRegistration) {
			this._localHarnessRegistration.dispose();
			this._localHarnessRegistration = undefined;
		}
	}
}
